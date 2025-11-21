import { ImprovedNoise } from "three/examples/jsm/Addons.js";
import * as THREE from 'three/webgpu'
import { bayer16 } from 'three/addons/tsl/math/Bayer.js';
import { vec3, Fn, time, texture3D, screenUV, uniform, screenCoordinate, pass } from 'three/tsl';
import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { gaussianBlur } from "three/examples/jsm/tsl/display/GaussianBlurNode.js";
import { useControls } from 'leva'


const ReactVolume = () => {
  const LAYER_VOLUMETRIC_LIGHTING = 10;
  const noiseTexture3D = createTexture3D();
  const volumetricPassRef = useRef()    
  const postProcessingRef = useRef()
  const volumeMaterialRef = useRef()
  const scenePassRef = useRef()
  const blurredVolumetricPassRef = useRef()
  const { gl, scene, camera } = useThree()

  const { nodes, uniforms } = useMemo(() => {
    const smokeAmount = uniform( 2 );
    const volumetricLightingIntensity = uniform( 1 );
    const denoiseStrength = uniform( .6 );

    const scatteringNode = Fn( ( { positionRay } ) => {
      const timeScaled = vec3( time, 0, time.mul( .3 ) );
      const sampleGrain = ( scale, timeScale = 1 ) => texture3D( noiseTexture3D, positionRay.add( timeScaled.mul( timeScale ) ).mul( scale ).mod( 1 ), 0 ).r.add( .5 );
      let density = sampleGrain( .1 );
      density = density.mul( sampleGrain( .05, 1 ) );
      density = density.mul( sampleGrain( .02, 2 ) );

      return smokeAmount.mix( 1, density );

    } );

    return {
      nodes: {
        scatteringNode,
      },
      uniforms: {
        smokeAmount,
        volumetricLightingIntensity,
        denoiseStrength
      },
    }
  }, [])

  const volumeRef = useRef(null)
  
  useEffect(() => {
    if(volumeRef.current) {
      volumeRef.current.layers.disableAll()
      volumeRef.current.layers.enable( LAYER_VOLUMETRIC_LIGHTING )
    }
  }, [])

  useEffect(() => {
    const volumetricLayer = new THREE.Layers();
    volumetricLayer.disableAll();
    volumetricLayer.enable( LAYER_VOLUMETRIC_LIGHTING );

    scenePassRef.current = pass( scene, camera );
    const sceneDepth = scenePassRef.current.getTextureNode( 'depth' );
    volumeMaterialRef.current.depthNode = sceneDepth.sample( screenUV )
    volumetricPassRef.current = pass( scene, camera, { depthBuffer: false } );
    volumetricPassRef.current.setLayers( volumetricLayer );
    volumetricPassRef.current.setResolutionScale( .25 );

    blurredVolumetricPassRef.current = gaussianBlur( volumetricPassRef.current, uniforms.denoiseStrength );
    const scenePassColor = scenePassRef.current.add( blurredVolumetricPassRef.current.mul( uniforms.volumetricLightingIntensity ) );
    postProcessingRef.current = new THREE.PostProcessing( gl )
    postProcessingRef.current.outputNode = scenePassColor

    return () => {
      if (postProcessingRef.current) {
        postProcessingRef.current.dispose();
      }
    };

  }, [gl, scene, camera,uniforms])

  useFrame(() => {
    // 只在需要时渲染后处理效果，不覆盖默认渲染
    if (postProcessingRef.current) {
      postProcessingRef.current.render();
    }
  },1);

  useEffect(() => {
    if(volumeMaterialRef.current) {
      volumetricPassRef.current.setResolutionScale(0.25)
    }
  }, [])

  const {denoiseStrength,volumetricLightingIntensity,smokeAmount} = useControls({
    resolution: { value: 0.35, min: 0.1, max: 0.5, step: 0.01,
      onChange: (value) => volumetricPassRef.current.setResolutionScale(value) 
    },
    steps: { value: 8, min: 2, max: 12, step: 1,
      onChange: (value) => volumeMaterialRef.current.steps = value
    },
    denoiseStrength: { value: 0.6, min: 0, max: 1, step: 0.1,},
    denoise: { value: true,
      onChange: (value) => {
        const volumetric = value ? blurredVolumetricPassRef.current : volumetricPassRef.current
        const scenePassColor = scenePassRef.current.add( volumetric.mul( uniforms.volumetricLightingIntensity.value ) );
        postProcessingRef.current.outputNode = scenePassColor;
        postProcessingRef.current.needsUpdate = true;
      }
    },
    volumetricLightingIntensity: { value: 1.4, min: 0, max: 14, step: 0.1},
    smokeAmount: { value: 0, min: 0, max: 4, step: 0.1},
  },{ collapsed: false });

  useEffect(() => {
    uniforms.denoiseStrength.value = denoiseStrength
    uniforms.volumetricLightingIntensity.value = volumetricLightingIntensity
    uniforms.smokeAmount.value = smokeAmount
    postProcessingRef.current.needsUpdate = true;
  }, [denoiseStrength,volumetricLightingIntensity,smokeAmount])

  return (
    <>
      <mesh receiveShadow ref={volumeRef}>
        <boxGeometry args={[50, 50, 50]} />
        <volumeNodeMaterial
          ref={volumeMaterialRef}
          steps={12}
          offsetNode = {bayer16( screenCoordinate )}
          scatteringNode = {nodes.scatteringNode}
        />
      </mesh>
       
    </>
  )
}

export default ReactVolume






function createTexture3D() {

  let i = 0;

  const size = 128;
  const data = new Uint8Array( size * size * size );

  const scale = 10;
  const perlin = new ImprovedNoise();

  const repeatFactor = 5.0;

  for ( let z = 0; z < size; z ++ ) {

    for ( let y = 0; y < size; y ++ ) {

      for ( let x = 0; x < size; x ++ ) {

        const nx = ( x / size ) * repeatFactor;
        const ny = ( y / size ) * repeatFactor;
        const nz = ( z / size ) * repeatFactor;

        const noiseValue = perlin.noise( nx * scale, ny * scale, nz * scale );

        data[ i ] = ( 128 + 128 * noiseValue );

        i ++;

      }

    }

  }

  const texture = new THREE.Data3DTexture( data, size, size, size );
  texture.format = THREE.RedFormat;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.unpackAlignment = 1;
  texture.needsUpdate = true;

  return texture;

}