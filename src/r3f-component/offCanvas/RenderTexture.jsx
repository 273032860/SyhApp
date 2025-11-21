import * as THREE from 'three/webgpu'
import * as React from 'react'
import { createPortal, useFrame, useThree } from '@react-three/fiber'
import { useFBO } from './useFBO'

export const RenderTexture = /* @__PURE__ */ React.forwardRef(
  (
    {
      children,
      width,
      height,
      renderPriority = 0,
      frames = Infinity,
      ...props
    },
    forwardRef
  ) => {
    const { size, viewport } = useThree()

    const fbo = useFBO(width || size.width * viewport.dpr, height ||size.height * viewport.dpr,{depth:true})
    const [vScene] = React.useState(() => new THREE.Scene())

    React.useImperativeHandle(forwardRef, () => fbo.texture, [fbo])

    return (
      <>
        {createPortal(
          <Container renderPriority={renderPriority} frames={frames} fbo={fbo}>
            {children}
            {/* Without an element that receives pointer events state.pointer will always be 0/0 */}
            <group onPointerOver={() => null} />
          </Container>,
          vScene,
        )}
        <primitive object={fbo.texture} {...props} />
      </>
    )
  }
)


function Container({
  frames,
  renderPriority,
  children,
  fbo,
}) {
  let count = 0
  let oldAutoClear
  let oldXrEnabled
  let oldRenderTarget
  let oldIsPresenting
  useFrame((state) => {
    if (frames === Infinity || count < frames) {
      oldAutoClear = state.gl.autoClear
      oldXrEnabled = state.gl.xr.enabled
      oldRenderTarget = state.gl.getRenderTarget()
      oldIsPresenting = state.gl.xr.isPresenting
      state.gl.autoClear = true
      state.gl.xr.enabled = false
      state.gl.xr.isPresenting = false
      state.gl.setRenderTarget(fbo)
      state.gl.render(state.scene, state.camera)
      state.gl.setRenderTarget(oldRenderTarget)
      state.gl.autoClear = oldAutoClear
      state.gl.xr.enabled = oldXrEnabled
      state.gl.xr.isPresenting = oldIsPresenting
      count++
    }
  }, renderPriority)
  return <>{children}</>
}