import { useThree } from "@react-three/fiber"
import { useEffect, useMemo } from "react"
import { MathUtils, PMREMGenerator, Scene, Vector3 } from "three/webgpu"
import { useControls } from "leva"
import { SkyMesh } from 'three/addons/objects/SkyMesh.js';

const Sky = () => {
    const scene = useThree((v)=>v.scene)
    const gl = useThree((v)=>v.gl)
    
    // 使用 useMemo 创建持久化的实例
    const sky = useMemo(() => new SkyMesh(), [])
    const sceneEnv = useMemo(() => new Scene(), [])
    const pmremGenerator = useMemo(() => new PMREMGenerator(gl), [])
    const sun = useMemo(() => new Vector3(), [])
    
    const { 
        turbidity,
        rayleigh,
        mieCoefficient,
        mieDirectionalG,
        elevation,
        azimuth,
        exposure,
    } = useControls('Sky', {
        turbidity: { value: 10, min: 0, max: 20, step: 0.1, label: '浊度' },
        rayleigh: { value: 3, min: 0, max: 4, step: 0.001, label: '瑞利散射' },
        mieCoefficient: { value: 0.005, min: 0, max: 0.1, step: 0.001, label: '米氏散射系数' },
        mieDirectionalG: { value: 0.7, min: 0, max: 1, step: 0.001, label: '米氏方向性' },
        elevation: { value: 2, min: 0, max: 90, step: 0.1, label: '太阳高度' },
        azimuth: { value: 180, min: -180, max: 180, step: 0.1, label: '太阳方位角' },
        exposure: { value: 0.5, min: 0, max: 1, step: 0.0001, label: '曝光度' },
    })
       
    // 只在组件挂载时执行一次的设置
    useEffect(() => {
        sky.scale.setScalar(1000)
        scene.add(sky)

        return () => {
            scene.remove(sky)
            sceneEnv.remove(sky)
            sky.geometry.dispose()
            sky.material.dispose()
            pmremGenerator.dispose()
            if (scene.environment) {
                scene.environment.dispose()
                scene.environment = null
            }
            if (scene.background) {
                // scene.background.dispose()
                scene.background = null
            }
        }
    }, [scene, sky, sceneEnv, pmremGenerator])


    // 使用 useEffect 更新天空参数
    useEffect(() => {
        // 更新天空参数
        sky.turbidity.value = turbidity
        sky.rayleigh.value = rayleigh
        sky.mieCoefficient.value = mieCoefficient
        sky.mieDirectionalG.value = mieDirectionalG

        const phi = MathUtils.degToRad(90 - elevation)
        const theta = MathUtils.degToRad(azimuth)
        sun.setFromSphericalCoords(1, phi, theta)
        sky.sunPosition.value.copy(sun)
        gl.toneMappingExposure = exposure


        // 更新环境贴图
        sceneEnv.add(sky)
        const renderTarget = pmremGenerator.fromScene(sceneEnv)
        scene.add( sky );

        scene.environment = renderTarget.texture
        // scene.background = renderTarget.texture

    }, [
        turbidity,
        rayleigh,
        mieCoefficient,
        mieDirectionalG,
        elevation,
        azimuth,
        exposure,
        sky,
        sun,
        gl,
        scene,
        sceneEnv,
        pmremGenerator
    ])
   

    return null
}

export default Sky