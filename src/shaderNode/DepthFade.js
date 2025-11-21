import { Fn, linearDepth, viewportLinearDepth } from "three/tsl"

export const depthFade = Fn(([distance]) => {
    const depthWater = viewportLinearDepth.sub( linearDepth() ).rgb.div(distance).saturate()
    return depthWater
})