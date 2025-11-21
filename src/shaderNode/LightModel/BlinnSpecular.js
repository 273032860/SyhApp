// Three.js Transpiler r171

import {   cameraPosition, Fn, normalWorld, positionWorld  } from 'three/tsl';

/**
 * Blinn-Phong高光反射模型函数
 * 计算基于半角向量的镜面反射光照
 * 
 * @param {Vector3} lightDir - 光源方向向量（归一化）
 * @param {float} smoothness - 表面光滑度，控制高光的锐利程度 0~1
 * @param {float} reflectance - 反射率，控制高光强度倍数 0~2
 * @param {Vector3} [norWorld=normalWorld] - 世界空间法线向量，默认使用内置的normalWorld
 * @returns {float} 返回计算后的高光强度值
 * 
 * @example
 * // 计算基于半角向量的镜面反射光照
 *  blinnSpecular(uniforms.lightDir,uniforms.smoothness,uniforms.shininessIntensity,normalWorld)
 */
export const blinnSpecular = Fn( ([lightDir,smoothness,norWorld=normalWorld]) => {
    return lightDir.add(cameraPosition.sub(positionWorld).normalize()).normalize().dot(norWorld).saturate().pow(smoothness.mul(10).add(1).exp2())
})
 