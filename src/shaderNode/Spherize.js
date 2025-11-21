// Three.js Transpiler r171

import { vec2, uv, dot, float, Fn } from 'three/tsl';

/**
 * 球面化变形函数
 * 将UV坐标进行球面化扭曲变形，创建类似球面投影的效果
 * 
 * @param {vec2} uv_immutable - 输入的UV坐标
 * @param {vec2} center_immutable - 变形的中心点
 * @param {vec2} strength_immutable - 变形强度，值越大变形越明显
 * @param {vec2} offset_immutable - 最终UV的偏移量
 * @returns {vec2} 返回变形后的UV坐标
 */
export const spherize = /*#__PURE__*/ Fn( ( [ uv_immutable, center_immutable, strength_immutable, offset_immutable ] ) => {

	const offset = vec2( offset_immutable ).toVar();
	const strength = vec2( strength_immutable ).toVar();
	const center = vec2( center_immutable ).toVar();
	const uv = vec2( uv_immutable ).toVar();
	const delta = vec2( uv.sub( center ) ).toVar();
	const delta2 = float( dot( delta.xy, delta.xy ) ).toVar();
	const delta4 = float( delta2.mul( delta2 ) ).toVar();
	const delta_offset = vec2( delta4.mul( strength ) ).toVar();
	const out_uv = vec2( uv.add( delta.mul( delta_offset ) ).add( offset ) ).toVar();

	return out_uv;

} ).setLayout( {
	name: 'spherize',
	type: 'vec2',
	inputs: [
		{ name: 'uv', type: 'vec2' },
		{ name: 'center', type: 'vec2' },
		{ name: 'strength', type: 'vec2' },
		{ name: 'offset', type: 'vec2' }
	]
} );
