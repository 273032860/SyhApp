import { useTexture } from "@react-three/drei"
import { useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from "react"
import { Color,   RepeatWrapping,   Vector3 } from "three/webgpu"
import { folder, useControls } from "leva"
import { color, Fn,  normalize,  uniform, vec2, vec3, float, mix, pow,  sub, time, texture, length, add, div, dot, max, reflector, positionWorld, cameraPosition, diffuseColor, reflect, mul } from "three/tsl"


const WaterReflect = ({position=[0, -1, 0]}) => {

    const uNormalTexture = useTexture('/textures/waternormals.jpg')
    uNormalTexture.wrapS = uNormalTexture.wrapT = RepeatWrapping
    const meshRef = useRef()
    const scene = useThree(v=>v.scene)
    

    const {uResolution,uAlpha,uLightPos,uNoiseScale,uSzie,uDiffuseColor,uLightIntensity,uLightColor,uNoiseSpeed,isWater
         
    } = useControls('水面',{
        uLightPos: { value: [0.70707,0.70707,0.0], min: -1, max: 1, step: 0.01,label: '光源位置' },
        uLightColor: { value: '#ffffff', label: '光源颜色' },
        uLightIntensity: { value: 1, min: 0, max: 5, step: 0.1, label: '光源强度' },
        uDiffuseColor: { value: '#000000', label: '水颜色' },
        uResolution: { value: 0.5, min: 0.1, max:1,label: '分辨率缩放' },
        uAlpha: { value: 1, min: 0, max: 1, step: 0.01, label: '透明度' },
        isWater: { value: 0, min: 0, max: 1, step: 0.01, label: '👍1水面/0反射' },

        noise: folder({
            uNoiseScale : { value: 0.5, min: 0, max: 50,label: '👍反射模糊度' },
            uSzie: { value: 0.3, min: 0.1, max:10,label: '👍size纹理缩放' },
            uNoiseSpeed: { value: 0.1, min: 0, max:2,step:0.1,label: '👍水流速度'   },
        }),
 
    })
    useEffect(() => {
        uniforms.uDiffuseColor.value = new Color(uDiffuseColor)
        uniforms.uLightColor.value = new Color(uLightColor)
        uniforms.uLightPos.value = new Vector3(uLightPos[0], uLightPos[1], uLightPos[2])
        uniforms.uNoiseScale.value = uNoiseScale
        uniforms.uSzie.value = uSzie
        uniforms.uLightIntensity.value = uLightIntensity
        uniforms.uNoiseSpeed.value = uNoiseSpeed
        uniforms.uResolution.value = uResolution
        uniforms.uAlpha.value = uAlpha
        uniforms.isWater.value = isWater

         
 
        
    },[uResolution,uAlpha,uLightPos,uNoiseScale,uSzie,uNoiseScale,uDiffuseColor,uLightIntensity,uLightColor,uNoiseSpeed,isWater ])
 

    const { key, uniforms,colorNode,distortion1} = useMemo(() => {
       
        const uniforms = {
            uLightPos : uniform(vec3(0)), 
            uDiffuseColor : uniform(color(uDiffuseColor)),
            uLightIntensity : uniform(0),
            uLightColor : uniform(color('#FFD700')),
            uResolution : uniform(uResolution),
            uAlpha : uniform(uAlpha),

            uNoiseSpeed : uniform(0),
            uSzie : uniform(0),
            uNoiseScale : uniform(0) ,

            isWater:uniform(0)
          }
          

        const getNoise = Fn( ( [ uv ] ) => {

            const offset = time.mul(uniforms.uNoiseSpeed);

            const uv0 = add( div( uv, 103 ), vec2( div( offset, 17 ), div( offset, 29 ) ) ).toVar();
            const uv1 = div( uv, 107 ).sub( vec2( div( offset, - 19 ), div( offset, 31 ) ) ).toVar();
            const uv2 = add( div( uv, vec2( 8907.0, 9803.0 ) ), vec2( div( offset, 101 ), div( offset, 97 ) ) ).toVar();
            const uv3 = sub( div( uv, vec2( 1091.0, 1027.0 ) ), vec2( div( offset, 109 ), div( offset, - 113 ) ) ).toVar();

            const sample0 = texture( uNormalTexture ).sample( uv0 );
            const sample1 = texture( uNormalTexture ).sample( uv1 );
            const sample2 = texture( uNormalTexture ).sample( uv2 );
            const sample3 = texture( uNormalTexture ).sample( uv3 );

            const noise = sample0.add( sample1 ).add( sample2 ).add( sample3 );

            return noise.mul( 0.5 ).sub( 1 );

        } );
     
        const noise = getNoise( positionWorld.xz.mul( uniforms.uSzie ) )
        const surfaceNormal = normalize(noise.xzy.mul( vec3( 1.5, 1.0, 1.5 ) ) ) 

        const worldToEye = cameraPosition.sub( positionWorld );
        const eyeDirection = normalize( worldToEye );

        const reflection = normalize( reflect(uniforms.uLightPos.normalize().negate(), surfaceNormal ) );
        const direction = max( 0.0, dot( eyeDirection, reflection ) );
        const specularLight = pow( direction, 100 ).mul( uniforms.uLightColor ).mul( 2.0 );
        const diffuseLight = max( dot( uniforms.uLightPos.normalize(), surfaceNormal ), 0.0 ).mul( uniforms.uLightColor.mul(uniforms.uLightIntensity) ).mul( 0.5 );

        const distance1 = length( worldToEye );

        const distortion1 = surfaceNormal.xz.mul( add( 0.001, div( 1.0, distance1 ) ) ).mul( uniforms.uNoiseScale )
         
        
        const colorNode = Fn(() => {
            const mirrorSampler = reflector();
            mirrorSampler.uvNode = mirrorSampler.uvNode.add( distortion1 );
            mirrorSampler.resolution = uniforms.uResolution;
            mirrorSampler.target.rotateX( - Math.PI / 2 );
            mirrorSampler.target.position.set(...position)

            scene.add( mirrorSampler.target );

            const theta = max( dot( eyeDirection, surfaceNormal ), 0.0 );
            const rf0 = float( 0.3 );
            const reflectance = mul( pow( float( 1.0 ).sub( theta ), 5.0 ), float( 1.0 ).sub( rf0 ) ).add( rf0 );
            const scatter = max( 0.0, dot( surfaceNormal, eyeDirection ) ).mul( uniforms.uDiffuseColor );
            const albedo = mix( uniforms.uLightColor.mul( diffuseLight ).mul( 0.3 ).add( scatter ), mirrorSampler.rgb.mul( specularLight ).add( mirrorSampler.rgb.mul( 0.9 ) ).add( vec3( 0.1 ) ), reflectance );

           return mix(mirrorSampler.mul(1.5),albedo,uniforms.isWater)
        })()

        const uHovered = uniform(0.0)
        return { key: uHovered.uuid, uHovered,uniforms,colorNode,distortion1 }
    }, [])

    useEffect(() => {
       meshRef.current.material.setupOutgoingLight = () => diffuseColor.rgb
    },[])
        
  return (
    <>
      <mesh
        ref={meshRef}
        position={position}
        scale={1}
        rotation-x={-Math.PI/2}
      >
        <planeGeometry args={[20,20]} />
      <meshStandardNodeMaterial key={key} 
        transparent 
        opacityNode={uniforms.uAlpha}  
        colorNode={colorNode} 
        // normalNode={colorNode}  
        receivedShadowPositionNode={positionWorld.add( distortion1 )} 
        />
      </mesh>
      
       
    </>
  )
}
export default WaterReflect


