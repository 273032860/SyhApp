import { useThree } from "@react-three/fiber"
import { useLayoutEffect } from "react"
import { useEffect } from "react"
import { useMemo } from "react"
import { DepthTexture, FloatType, HalfFloatType, LinearFilter, RenderTarget } from "three/webgpu"

export function useFBO(
  /** Width in pixels, or settings (will render fullscreen by default) */
  width,
  /** Height in pixels */
  height,
  /**Settings */
  settings
) {
  const size = useThree((state) => state.size)
  const viewport = useThree((state) => state.viewport)
  const _width = typeof width === 'number' ? width : size.width * viewport.dpr
  const _height = typeof height === 'number' ? height : size.height * viewport.dpr
  const _settings = (typeof width === 'number' ? settings : width) || {}
  const { samples=0,depth, ...targetSettings } = _settings

  const depthBuffer = depth ?? _settings.depthBuffer // backwards compatibility for deprecated `depth` prop

  const target = useMemo(() => {
    const target = new RenderTarget(_width, _height, {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      type: HalfFloatType,
      ...targetSettings,
    })

    if (depthBuffer) {
      target.depthTexture = new DepthTexture(_width, _height, FloatType)
    }

    target.samples = samples
    return target
  }, [])

  useLayoutEffect(() => {
    target.setSize(_width, _height)
    if (samples) target.samples = samples
  }, [samples, target, _width, _height])

  useEffect(() => {
    return () => target.dispose()
  }, [])
   return target
}