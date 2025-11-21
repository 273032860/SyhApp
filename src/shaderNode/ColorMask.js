// Three.js Transpiler r171

import { float,  Fn, EPSILON, vec4, max } from 'three/tsl';


/**
 * 颜色遮罩着色器函数
 * @param {Object} tex - vec4 输入纹理
 * @param {Object} col - vec3 目标颜色
 * @param {number} op - 颜色透明的
 * @param {number} range - 颜色匹配范围
 * @param {number} fuzziness - 模糊度,值越大边缘越柔和
 * @returns {Object} 返回0-1之间的遮罩值,1表示完全匹配目标颜色
 */

export const colorMask = /*#__PURE__*/ Fn( ( [input,col,op,range,fuzziness] ) => {

 
	const node1 = vec4(col,op).distance(input).sub(range).oneMinus().div(float(fuzziness).max(EPSILON)).saturate()
	return node1
} )
export const colorMask_vec3 = /*#__PURE__*/ Fn( ( [input,col,range,fuzziness] ) => {

 
	const node1 = col.distance(input).sub(range).oneMinus().div(float(fuzziness).max(EPSILON)).saturate()
	return node1
} )