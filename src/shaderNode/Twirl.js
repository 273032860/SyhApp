// Three.js Transpiler r171

import { vec2, float, uv, length, cos, sin, Fn } from 'three/tsl';

/**
 * 对纹理的 UV 坐标应用旋涡扭曲效果。
 *
 * @function twirl
 * @param {vec2} uv - vec2纹理的原始 UV 坐标。
 * @param {vec2} center - vec2旋涡效果的中心点，在 UV 空间中定义。
 * @param {float} strength - float旋涡扭曲的强度。正值表示顺时针旋涡，负值表示逆时针旋涡。
 * @param {vec2} offset - vec2在旋涡效果应用后附加的 UV 偏移量。
 * @returns {vec2} 应用旋涡扭曲后的 UV 坐标。
 *
*/
export const twirl = /*#__PURE__*/ Fn( ( [ uv_immutable, center_immutable, strength_immutable, offset_immutable ] ) => {

	const offset = vec2( offset_immutable ).toVar();
	const strength = float( strength_immutable ).toVar();
	const center = vec2( center_immutable ).toVar();
	const uv = vec2( uv_immutable ).toVar();
	const delta = vec2( uv.sub( center ) ).toVar();
	const angle = float( strength.mul( length( delta ) ) ).toVar();
	const x = float( cos( angle ).mul( delta.x ).sub( sin( angle ).mul( delta.y ) ) ).toVar();
	const y = float( sin( angle ).mul( delta.x ).add( cos( angle ).mul( delta.y ) ) ).toVar();
	const out_uv = vec2( x.add( center.x ).add( offset.x ), y.add( center.y ).add( offset.y ) ).toVar();

	return out_uv;

} ).setLayout( {
	name: 'twirl',
	type: 'vec2',
	inputs: [
		{ name: 'uv', type: 'vec2' },
		{ name: 'center', type: 'vec2' },
		{ name: 'strength', type: 'float' },
		{ name: 'offset', type: 'vec2' }
	]
} );
