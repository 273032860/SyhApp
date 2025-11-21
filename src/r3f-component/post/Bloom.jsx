import { useFrame, useThree } from '@react-three/fiber';
import { bloom } from 'three/addons/tsl/display/BloomNode.js';
import { PostProcessing } from 'three/webgpu'
import { pass, output, emissive, mrt } from 'three/tsl'
import { useEffect, useRef } from 'react';
import { useControls } from 'leva'


const Bloom = ({ intensity = 0.1 }) => {

  const bloomPassRef = useRef()    
  const postProcessingRef = useRef()    

  const { gl, scene, camera } = useThree() //获取gl mesh 相机 
     
  
  useEffect(() => {
    // gl.toneMapping = ACESFilmicToneMapping

    const scenePass = pass( scene, camera );
    scenePass.setMRT( mrt( {
      output,
      emissive
    } ) );
    const outputPass = scenePass.getTextureNode();
    const emissivePass = scenePass.getTextureNode( 'emissive' );
    bloomPassRef.current = bloom( emissivePass, 0.1, .5 );
    postProcessingRef.current = new PostProcessing( gl );
    postProcessingRef.current.outputNode = outputPass.add( bloomPassRef.current );
    
    // 返回清理函数
    return () => {
      if (postProcessingRef.current) {
        postProcessingRef.current.dispose();
      }
    };
  }, [gl, scene, camera]);
  
  useFrame(() => {
    // 只在需要时渲染后处理效果，不覆盖默认渲染
    if (postProcessingRef.current) {
      postProcessingRef.current.render();
    }
  }, 1);

  useControls('bloom',{
    threshold: { value: 0.2, min: 0, max: 1, step: 0.01,label: '阈值',onChange: (value) => {
      if (bloomPassRef.current) {
        bloomPassRef.current.threshold.value = value;
      }
    }},
    strength: { value: intensity, min: 0, max: 5, step: 0.01,label: '强度',onChange: (value) => {
      if (bloomPassRef.current) {
        bloomPassRef.current.strength.value = value;
      }
    }},
    radius: { value: 0.1, min: 0, max: 1,label: '半径', step: 0.01,onChange: (value) => {
      if (bloomPassRef.current) {
        bloomPassRef.current.radius.value = value;
      }
    }},
  });
 
 
  return null;
};

export default Bloom;