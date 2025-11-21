// Three.js Transpiler r171

import { vec2, uv, dot, float, Fn } from 'three/tsl';

/**
 * @function radialShear
 * @description 用于实现径向扭曲的 GLSL 函数。通过对 UV 坐标施加基于中心点和强度的扭曲变换，可用于特效如鱼眼、波纹等。
 *
 * @param {vec2} uv - vec2输入的 UV 坐标，定义纹理的原始采样位置。
 * @param {vec2} center - vece2径向扭曲的中心点，影响扭曲效果的起始位置。
 * @param {vec2} strength - vec2扭曲强度，两个分量分别控制 x 和 y 方向的扭曲程度。
 * @param {vec2} offset - vec2偏移量，用于调整输出 UV 坐标的位置。
 * @returns {vec2} 计算后的新的 UV 坐标，包含扭曲和偏移效果。
*/
export const radialShear = /*#__PURE__*/ Fn( ( [ uv_immutable, center_immutable, strength_immutable, offset_immutable ] ) => {

	const offset = vec2( offset_immutable ).toVar();
	const strength = vec2( strength_immutable ).toVar();
	const center = vec2( center_immutable ).toVar();
	const uv = vec2( uv_immutable ).toVar();
	const delta = vec2( uv.sub( center ) ).toVar();
	const delta2 = float( dot( delta.xy, delta.xy ) ).toVar();
	const delta_offset = vec2( delta2.mul( strength ) ).toVar();
	const out_uv = vec2( uv.add( vec2( delta.y, delta.x.negate() ).mul( delta_offset ) ).add( offset ) ).toVar();

	return out_uv;

} ).setLayout( {
	name: 'radialShear',
	type: 'vec2',
	inputs: [
		{ name: 'uv', type: 'vec2' },
		{ name: 'center', type: 'vec2' },
		{ name: 'strength', type: 'vec2' },
		{ name: 'offset', type: 'vec2' }
	]
} );
