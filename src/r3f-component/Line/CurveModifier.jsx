import * as React from 'react'
import * as THREE from 'three/webgpu'
import { createPortal } from '@react-three/fiber'
import { Flow } from 'three/addons/modifiers/CurveModifierGPU.js';


export const CurveModifier = ({ children, curve,ref }) => {
  const [scene] = React.useState(() => new THREE.Scene())
  const [obj, set] = React.useState()
  const modifier = React.useRef(null)

  React.useLayoutEffect(() => {
    modifier.current = new Flow(
      scene.children[0]
    )
    set(modifier.current.object3D)
  }, [children,scene])

  React.useEffect(() => {
    if (curve) modifier.current?.updateCurve(0, curve)
  }, [curve])

  React.useImperativeHandle(ref, () => modifier.current)

  return (
    <>
      {createPortal(children, scene)}
      {obj && <primitive object={obj} />}
    </>
  )
}