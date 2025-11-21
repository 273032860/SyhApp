import { useThree } from "@react-three/fiber"
import { useEffect, useMemo } from "react"
import { EquirectangularReflectionMapping, HalfFloatType, Matrix4 } from "three/webgpu"
import { hue, pmremTexture, positionLocal, positionWorld, positionWorldDirection, reflectVector, saturation, uniform } from "three/tsl"
import { useControls } from "leva"
import { UltraHDRLoader } from 'three/addons/loaders/UltraHDRLoader.js';
import { suspend } from 'suspend-react'

/**
 * HDR 环境贴图组件
 * @param {Object} props - 组件属性
 * @param {boolean} [props.background=false] - 是否将 HDR 贴图设置为场景背景
 * @param {string} props.path - HDRJpg 贴图文件路径
 * @returns {null} - 该组件不渲染任何可见内容，仅设置场景的环境贴图和背景
 * @description 
 */
const HdrJpg = ({background=false,path}) => {
    const scene= useThree((v)=>v.scene)
    const texture = suspend(
        async (url) => {
          const loader = new UltraHDRLoader()
          loader.setDataType(HalfFloatType)
          const result = await loader.loadAsync(url)
          result.mapping = EquirectangularReflectionMapping;
          result.needsUpdate = true;
          return result
        },
        [path]
      )

    const blurNode = useMemo(() => uniform(0),[]);
    const rotateY1Matrix = useMemo(() =>new Matrix4(),[])
    const intensityNode = useMemo(() => uniform(0),[]);
    const hueNode = useMemo(() => uniform(0),[]);
    const saturationNode = useMemo(() => uniform(0),[]);
    
    useControls('背景',{
        blurBackground: { value: 0, min: 0, max: 1,onChange:(v)=>{
            blurNode.value = v
        }},
        rotateY:{value: 0, min: 0, max: Math.PI * 2,step:0.01,onChange:(v)=>{
            rotateY1Matrix.makeRotationY( v );
        }},
        intensity:{value: 1, min: 0, max: 5,step:0.01,onChange:(v)=>{
            intensityNode.value = v
        }},
        hue:{value: 0, min: 0, max: Math.PI * 2,step:0.01,onChange:(v)=>{
            hueNode.value = v
        }},
        saturation:{value: 1, min: 0, max: 2,step:0.01,onChange:(v)=>{
            saturationNode.value = v
        }},
      })
       

      const getEnvironmentNode = ( reflectNode, positionNode ) => {
        const custom1UV = reflectNode.xyz.mul( uniform( rotateY1Matrix ) );
        const mixCubeMaps = pmremTexture( texture, custom1UV )
        const intensityFilter = mixCubeMaps.mul( intensityNode );
        const hueFilter = hue( intensityFilter, hueNode );
        return saturation( hueFilter, saturationNode );

    };  

    useEffect(() => {
        //光照
        scene.environmentNode = getEnvironmentNode( reflectVector, positionWorld )
        
        //背景,带模糊
        if(background){
            scene.backgroundNode = getEnvironmentNode( positionWorldDirection, positionLocal ).context( {
                getTextureLevel: () => blurNode
            } );
        }
      },[scene])

    return null

}


export default HdrJpg