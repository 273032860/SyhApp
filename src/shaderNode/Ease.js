import { cos, float, Fn, PI, pow, select, sin, sqrt } from "three/tsl"

export const easeInSineNode = /*#__PURE__*/ Fn(([inV]) => {
    return float(1).sub(cos(inV.mul(PI).div(2)))
})
export const easeOutSineNode = /*#__PURE__*/ Fn(([inV]) => {
    return sin(inV.mul(PI).div(2))
})
export const easeInOutSineNode = /*#__PURE__*/ Fn(([inV]) => {
    return cos(PI.mul(inV)).sub(1).negate().div(2)
})
export const easeInCubicNode = /*#__PURE__*/ Fn(([inV]) => {
    return inV.mul(inV).mul(inV)
})
export const easeOutCubicNode = /*#__PURE__*/ Fn(([inV]) => {
    return pow(inV.oneMinus(),float(3)).oneMinus()
})
export const easeInOutCubicNode = /*#__PURE__*/ Fn(([inV]) => {
    return select(
        inV.lessThan(float(0.5)),
        float(4).mul(inV).mul(inV).mul(inV),
        pow(float(-2).mul(inV).add(2),float(3)).div(2).oneMinus()
    )
})
export const easeInQuadNode = /*#__PURE__*/ Fn(([inV]) => {
    return inV.mul(inV)
})
export const easeOutQuadNode = /*#__PURE__*/ Fn(([inV]) => {
    return inV.oneMinus().mul(inV.oneMinus()).oneMinus()
})
export const easeInOutQuadNode = /*#__PURE__*/ Fn(([inV]) => {
    return select(
        inV.lessThan(float(0.5)),
        inV.mul(inV).mul(2),
        pow(float(-2).mul(inV).add(2),float(2)).div(2).oneMinus()
    )
})

export const easeInQuartNode = /*#__PURE__*/ Fn(([inV]) => {
    return inV.mul(inV).mul(inV).mul(inV)
})
export const easeOutQuartNode = /*#__PURE__*/ Fn(([inV]) => {
    return pow(inV.oneMinus(),float(4)).oneMinus()
})
export const easeInOutQuartNode = /*#__PURE__*/ Fn(([inV]) => {
    return select(
        inV.lessThan(float(0.5)),
        inV.mul(inV).mul(inV).mul(inV).mul(8),
        pow(float(-2).mul(inV).add(2),float(4)).div(2).oneMinus()
    )
})
export const easeInCircNode = /*#__PURE__*/ Fn(([inV]) => {
    return pow(inV,2).oneMinus().sqrt().oneMinus()
})
export const easeOutCircNode = /*#__PURE__*/ Fn(([inV]) => {
    return sqrt(float(1).sub(pow(inV.oneMinus(),float(2))))
})
export const easeInOutCircNode = /*#__PURE__*/ Fn(([inV]) => {
    return select(
        inV.lessThan(float(0.5)),
        float(1).sub(sqrt(float(1).sub(pow(float(2).mul(inV),2)))).div(2),
        sqrt(float(1).sub(pow(float(-2).mul(inV).add(2),2))).add(1).div(2)
    )
})
export const easeInExpoNode = /*#__PURE__*/ Fn(([inV]) => {
    return select(
        inV.equal(0),
        float(0),
        pow(2,float(10).mul(inV).sub(10))
    )
})
export const easeOutExpoNode = /*#__PURE__*/ Fn(([inV]) => {
    return select(
        inV.equal(1),
        float(1),
        pow(2,float(-10).mul(inV)).oneMinus()
    )
})
export const easeInOutExpoNode = /*#__PURE__*/ Fn(([inV]) => {
    return select(
        inV.equal(0),
        float(0),
        select(
            inV.equal(1),
            float(1),
            select(
                inV.lessThan(float(0.5)),
                pow(2,float(20).mul(inV).sub(10)).div(2),
                float(2).sub(pow(2,float(-20).mul(inV).add(10))).div(2)
            )
        )
    )
})


