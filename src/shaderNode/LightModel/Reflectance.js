// Three.js Transpiler r171

import {  Fn, mix, normalWorld  } from 'three/tsl';
import { fresnel } from '../Fresnel';

/**
 * 计算PBR材质的反射率函数
 * 基于金属度和菲涅尔效应计算表面反射率
 * 
 * @param {Vector3} baseColor - 基础颜色，通常是材质的漫反射颜色
 * @param {float} metallic - 金属度，0表示非金属（电介质），1表示金属
 * @param {Vector3} [norWorld=normalWorld] - 世界空间法线向量，默认使用内置的normalWorld
 * @returns {Vector3} 返回计算后的反射率值
 */
export const reflectance = Fn (([baseColor,metallic,norWorld=normalWorld]) => {
    return mix(mix(0.04,1,fresnel(3,norWorld)),baseColor,metallic)
})
 