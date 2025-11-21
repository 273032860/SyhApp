import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from 'three/webgpu'
import React from 'react'
import { clamp,  color,  Fn, mix, normalMap, reflector, smoothstep, texture, time, uniform, uv, vec3 } from "three/tsl";
import { tilingAndOffset } from "@/shaderNode/TilingAndOffset";
import { simple } from "@/shaderNode/Simple";
import { useControls } from "leva";

export default function Floor({position=[0,-1,0]}) {
    const [diff, nor, rough, ao] = useTexture([
        "textures/road/aerial_asphalt_01_diff_2k.jpg",
        "textures/road/aerial_asphalt_01_nor_gl_2k.jpg",
        "textures/road/aerial_asphalt_01_rough_2k.jpg",
        "textures/road/aerial_asphalt_01_ao_2k.jpg",
    ]);
    diff.colorSpace = THREE.SRGBColorSpace
    diff.wrapS = diff.wrapT = THREE.RepeatWrapping
    nor.wrapS = nor.wrapT = THREE.RepeatWrapping
    rough.wrapS = rough.wrapT = THREE.RepeatWrapping
    ao.wrapS = ao.wrapT = THREE.RepeatWrapping
    
    const scene = useThree(v=>v.scene) //获取gl mesh 相机 


    const [floorColor,floorNormal] = useTexture([
        'public/textures/floors/decal-diffuse.png',
        'public/textures/waternormals.jpg',
    ])
    floorColor.colorSpace = THREE.SRGBColorSpace
    floorColor.wrapS = floorColor.wrapT = THREE.RepeatWrapping
    floorNormal.wrapS = floorNormal.wrapT = THREE.RepeatWrapping

    const {uNoiseSpeed,uSzie,blur,maskScale,maskSmoothStep1,maskSmoothStep2,speed} = useControls('反射水渍地板',{
        duckCol: { value: '#FFD700', label: '基础颜色' },
        uNoiseSpeed: { value: 1, min: 0, max: 1, step: 0.01, label: '偏移' },
        blur: { value: 0.06, min: 0, max: 1, label: '模糊度'},
        uSzie: { value: 0.8, min: 0, max: 10, step: 0.1, label: '模糊度2' },
        speed: { value: 0.0, min: 0, max: 0.1, step: 0.01, label: '水流速度' },

        maskScale: { value: 150, min: 0, max: 200, step: 1, label: '遮罩缩放' },
        maskSmoothStep1: { value: 0.39, min: 0, max: 1, step: 0.01, label: '遮罩平滑1' },
        maskSmoothStep2: { value: 0.44, min: 0, max: 1, step: 0.01, label: '遮罩平滑2' },
    })
    React.useEffect(() => {
        // uniforms.duckCol.value = new THREE.Color(duckCol)
        uniforms.blur.value = blur
        uniforms.uNoiseSpeed.value = uNoiseSpeed
        uniforms.uSzie.value = uSzie
        uniforms.maskScale.value = maskScale
        uniforms.maskSmoothStep1.value = maskSmoothStep1
        uniforms.maskSmoothStep2.value = maskSmoothStep2
        uniforms.speed.value = speed

        

    },[blur, uNoiseSpeed,uSzie,maskScale,maskSmoothStep1,maskSmoothStep2,speed])
    
 


    const { uniforms,colorNode} = React.useMemo(() => {
        const uniforms = {
            blur : uniform( 0 ),
            // duckCol : uniform(color(duckCol)),
            uNoiseSpeed : uniform(1),
            uSzie : uniform(1),

            maskScale : uniform(1),
            maskSmoothStep1: uniform(0.01),
            maskSmoothStep2: uniform(0.01),
            speed: uniform(0.02),
        }
        const uHovered = uniform(0.0)

   
        const colorNode = Fn(() => {
             
            const floorNormalOffset = texture( floorNormal, tilingAndOffset(uv().add(time.mul(uniforms.speed)),uniforms.uSzie,uniforms.uNoiseSpeed )).xy.mul( 2 ).sub( 1 ).mul( uniforms.blur );

            const reflections = reflector({ resolution: 0.5 })
            reflections.target.rotateX( - Math.PI / 2 );
            reflections.target.position.set(...position)
            reflections.uvNode = reflections.uvNode.add( floorNormalOffset );
            scene.add(reflections.target);

            return reflections.rgb;

        })()
   
        
        return { key: uHovered.uuid, uHovered,uniforms,colorNode }
    }, [])
 

    return(
        <>
        <mesh position={position} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[45,45]} />
          <meshPhysicalNodeMaterial 
          colorNode={mix(texture(diff).rgb,colorNode.rgb,smoothstep(uniforms.maskSmoothStep1,uniforms.maskSmoothStep2,simple(uv(),uniforms.maskScale)))}  
          roughnessNode={Fn(()=>{
              const prevRoughness = texture(rough,uv()).r
              const clampRouh = clamp(prevRoughness,0.0,0.1)
              return clampRouh
          })()}
          aoNode={texture(ao)}
          normalNode={mix(normalMap(texture(nor)).rgb,vec3(0,1,0),smoothstep(uniforms.maskSmoothStep1,uniforms.maskSmoothStep2,simple(uv(),uniforms.maskScale)))}
          transparent
          />
        </mesh>
         
        </>
    )
}