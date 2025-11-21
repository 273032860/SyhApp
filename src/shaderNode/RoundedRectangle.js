// Three.js Transpiler r172

import { float, vec2, abs, min, max, length, sub, fwidth, clamp, Fn } from 'three/tsl';

/**
 * 创建一个圆角矩形的 SDF（有符号距离场）
 * @param {Object} params - 输入参数
 * @param {vec2} params.UV_immutable - UV坐标，范围[0,1]
 * @param {float} params.width_immutable - 矩形宽度，相对于UV空间
 * @param {float} params.height_immutable - 矩形高度，相对于UV空间
 * @param {float} params.radius_immutable - 圆角半径，不能超过宽度和高度的一半
 * @returns {float} 返回一个[0,1]范围的值，用于表示圆角矩形的边缘过渡
 * 
 * @example
* // 创建一个宽0.8，高0.6，圆角半径0.1的矩形
* roundedRectangle(uv(), 0.8, 0.6, 0.1)
*/
export const roundedRectangle = /*#__PURE__*/ Fn( ( [ UV_immutable, width_immutable, height_immutable, radius_immutable ] ) => {

	const height = float( height_immutable ).toVar();
	const width = float( width_immutable ).toVar();
	const radius = float( radius_immutable ).toVar();
	const UV = vec2( UV_immutable ).toVar();
	const Radius = float( max( min( min( abs( radius.mul( 2.0 ) ), abs( width ) ), abs( height ) ), 1e-5 ) ).toVar();
	const uv = vec2( abs( UV.mul( 2.0 ).sub( 1.0 ) ).sub( vec2( width, height ) ).add( Radius ) ).toVar();
	const d = float( length( max( vec2( 0.0, 0.0 ), uv ) ).div( Radius ) ).toVar();

	return clamp( sub( 1.0, d ).div( fwidth( d ) ), 0.0, 1.0 );

} ).setLayout( {
	name: 'roundedRectangle',
	type: 'float',
	inputs: [
		{ name: 'UV', type: 'vec2' },
		{ name: 'radius', type: 'float' },
		{ name: 'width', type: 'float' },
		{ name: 'height', type: 'float' }
	]
} );
