import { useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import { useEffect, useMemo } from 'react'
import { hue, pmremTexture, positionLocal, positionWorld, positionWorldDirection, reflectVector, saturation, uniform } from 'three/tsl';
import { LinearMipmapLinearFilter, Matrix4 } from 'three/webgpu';

const SixCube = ({background=false,cubeTexture}) => {
    const scene = useThree(v=>v.scene)
    const cube1Texture = cubeTexture
    cube1Texture.generateMipmaps = true;
    cube1Texture.minFilter = LinearMipmapLinearFilter
    
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
      },{collapsed: true})
       
    const getEnvironmentNode = ( reflectNode, positionNode ) => {
        const custom1UV = reflectNode.xyz.mul( uniform( rotateY1Matrix ) );
        const mixCubeMaps = pmremTexture( cube1Texture, custom1UV )
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

export default SixCube