import * as THREE from "three/webgpu";
import {
  pass,
  mrt,
  output,
  transformedNormalView,
  metalness,
  blendColor,
  emissive,
  vec2,
  roughness,
} from "three/tsl";
import { bloom } from "three/addons/tsl/display/BloomNode.js";
import { ssr } from "three/addons/tsl/display/SSRNode.js";
import { smaa } from "three/addons/tsl/display/SMAANode.js";
import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { folder, useControls } from "leva";

export function SSr_bloom() {
  const { gl: renderer, scene, camera, size } = useThree();
  const postProcessingRef = useRef(null);
  const ssrRef = useRef(null);
  const bloomPassRef = useRef(null);

  // const uStrength =  useMemo(() => uniform(strength), [])
  // const uRadius = useMemo(() => uniform(radius), [])

  useEffect(() => {
    if (!renderer || !scene || !camera) return;

    // Create post-processing setup with specific filters
    const scenePass = pass(scene, camera, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
    });

    // Setup Multiple Render Targets (MRT)
    scenePass.setMRT(
      mrt({
        output: output,
        normal: transformedNormalView,
        emissive: emissive,
        metalrough: vec2( metalness, roughness )
      })
    );

    // Get texture nodes
    const scenePassColor = scenePass.getTextureNode("output");
    const scenePassNormal = scenePass.getTextureNode("normal");
    const scenePassDepth = scenePass.getTextureNode("depth");
    const scenePassEmissive = scenePass.getTextureNode("emissive");
    const scenePassMetalRough = scenePass.getTextureNode( 'metalrough' );

     

    // Create SSR pass
    ssrRef.current = ssr(
      scenePassColor,
      scenePassDepth,
      scenePassNormal,
      scenePassMetalRough.r,
      scenePassMetalRough.g,
      // camera
    );
 
    
    // Create bloom pass
    bloomPassRef.current = bloom(scenePassEmissive, 2.5, .5);

    // Blend SSR over beauty with SMAA
    const outputNode = smaa(blendColor(scenePassColor.add(bloomPassRef.current), ssrRef.current));

    // Setup post-processing
    const postProcessing = new THREE.PostProcessing(renderer);
    postProcessing.outputNode = outputNode;
    postProcessingRef.current = postProcessing;

    // Handle window resize

    if (postProcessingRef.current.setSize) {
      postProcessingRef.current.setSize(size.width, size.height);
      postProcessingRef.current.needsUpdate = true;
    }

    // 返回清理函数
    return () => {
      postProcessingRef.current = null;
    };
  }, [renderer, scene, camera, size]);

  useFrame(() => {
    if (postProcessingRef.current) {
      // gl.clear();
      postProcessingRef.current?.render();
    }
  }, 1);

  const prams =  useControls('ssr_bloom',{
      resolutionScale_: { value: 0.35, min: 0.1, max: 1},
      blurQuality_: { value: 1, min: 0.1, max: 5,step:1},
      quality_: { value: 0.3, min: 0.1, max: 1},
      maxDistance_: { value: 6, min: 0.1, max: 10},
      opacity_: { value: 0.85, min: 0.1, max: 1},
      thickness_: { value: 0.015, min: 0.0, max: 0.05,step:0.001},
      'bloom':folder({
        strength_: { value: 0.05, min: 0.01, max: 5},
        radius_: { value: 0.5, min: 0.1, max: 1},
        threshold: { value: 0.0, min: 0, max: 5, step: 0.01,label: '阈值'}
      })
  })

  useEffect(() => { 
    ssrRef.current.resolutionScale = prams.resolutionScale_; 
    ssrRef.current.blurQuality.value = prams.blurQuality_; 
    ssrRef.current.quality.value = prams.quality_; 
    ssrRef.current.maxDistance.value = prams.maxDistance_; 
    ssrRef.current.opacity.value = prams.opacity_; 
    ssrRef.current.thickness.value = prams.thickness_; 
    bloomPassRef.current.strength.value = prams.strength_;
    bloomPassRef.current.radius.value = prams.radius_;
    bloomPassRef.current.threshold.value = prams.threshold;
    
  }, [prams,size,renderer, scene, camera])


  return null;
}