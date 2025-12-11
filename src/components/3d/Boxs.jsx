import { Box } from '@react-three/drei'
import React, { useMemo } from 'react'
import { useAppStore } from '@/Store'
import { Color } from 'three'
import { Fn, uniform } from 'three/tsl'

const Boxs = () => {
  const toggleLeftTop = useAppStore((state)=>state.toggleLeftTop)
  const setLeftBottom = useAppStore((state)=>state.setLeftBottom)
  function onClick() {
    toggleLeftTop()
  }
  function onClick1() {
    setLeftBottom(true)
  }
  function onClick2() {
    setLeftBottom(false)
  }

  const { nodes } = useMemo(() => {
  const time = uniform(0.0);
  const color1 = uniform(new Color(0xff0000), 'color');
   

  const colorNode = Fn(() => {
    return color1
  })();

  return {
    nodes: {
       
      colorNode,
    },
    uniforms: {
      time,
    },
  }
}, [])
  return (
    <>
      <Box onClick={onClick}>
        <meshBasicMaterial {...nodes} />
        </Box>
      <Box position={[4,0,0]} onClick={onClick1}/>
      <Box position={[4,2,0]} onClick={onClick2}/>
    </>
  )
}

export default Boxs