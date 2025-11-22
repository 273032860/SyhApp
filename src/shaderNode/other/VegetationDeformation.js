import { float, Fn, modelWorldMatrix, modelWorldMatrixInverse, normalLocal, normalWorld, positionLocal, time, transformDirection, vec2, vec3, vec4 } from "three/tsl"

const triangleWave = Fn(([input]) => {
    return input.add(0.5).fract().remap(0,1,-1,1).abs()
})

const smoothCurve = Fn(([input]) => {
   return input.mul(input).mul(float(3).sub(input.mul(2)))
})


const smoothTriangleWave = Fn(([input]) => {
   const node1 = triangleWave(input)
   return vec4(smoothCurve(node1.r),smoothCurve(node1.g),smoothCurve(node1.b),smoothCurve(node1.a)).remap(0,1,-0.5,0.5)
})

/**
 * 植物顶点变形
 *
 * @type {*}
 */
export const vegetationDeformation = Fn(([bendStrength,windDir,leafSpeed,leafSiffness,leafFrequency,leafAmplitude,branchStiffness,branchAmplitude,phaseOffset]) => {
   const fbf = positionLocal.g.mul(bendStrength).add(1)
   const fbf2 = fbf.mul(fbf)
   const fbf3 = fbf2.mul(fbf2).sub(fbf2)
   const mainNode1 = vec3(windDir.mul(fbf3).r,0,windDir.mul(fbf3).g).add(positionLocal)
   const mainBending = transformDirection(mainNode1,modelWorldMatrixInverse).mul(positionLocal.length())//vec3
   const magic2 = modelWorldMatrix[1].dot(vec4(1))//vec1
   const magicOut2 = phaseOffset.mul(3.3)
   const magicOut1 = phaseOffset.mul(1.2).add(magicOut2).add(magic2)
   const nodedot = vec2(mainBending.dot(magicOut1),magicOut2).add(time)
   const magicFun01 = vec4(nodedot.x,nodedot.x,nodedot.y,nodedot.y).mul(vec4(1.975, 0.693, 0.375, 0.193)).mul(2).sub(1).mul(leafSpeed).mul(leafFrequency)
   const smoothWave = smoothTriangleWave(magicFun01)
   const magicFun02 = vec3(smoothWave.xz.add(smoothWave.yw).x,smoothWave.xz.add(smoothWave.yw).y,smoothWave.xz.add(smoothWave.yw).x)
   const magicfun3a = leafAmplitude.mul(leafSiffness)
   const magicfun3b = branchStiffness.oneMinus().mul(branchAmplitude)
   const magicfun3 = vec3(normalLocal.x.mul(magicfun3a),magicfun3b,normalLocal.z.mul(magicfun3a))
   return magicFun02.mul(magicfun3).add(mainBending)

})