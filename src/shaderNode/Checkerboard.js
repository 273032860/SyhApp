// Three.js Transpiler r171

import { vec2, vec3, dFdx, dFdy, vec4, dot, sqrt, float, fract, abs, mul, div, max, sub, clamp, add, mix, Fn } from 'three/tsl';

/**
 * 生成一个基于输入的 UV 坐标、颜色和频率的棋盘格图案。
 * 图案在 UV 位置上交替使用 ColorA 和 ColorB 两种颜色，且根据 UV 的导数和频率进行额外的缩放。
 *
 * @function
 * @name checkerboard
 * @param {vec2} UV - 用于生成棋盘格图案的 2D UV 坐标。
 * @param {vec3} ColorA - 棋盘格图案的第一种颜色。
 * @param {vec3} ColorB - 棋盘格图案的第二种颜色。
 * @param {vec2} Frequency - 棋盘格图案在 UV 空间中的频率。
 * @returns {vec3} - 给定 UV 坐标位置下的颜色，返回 ColorA 和 ColorB 之间的混合颜色。
*/
export const checkerboard = /*#__PURE__*/ Fn( ( [ UV_immutable, ColorA_immutable, ColorB_immutable, Frequency_immutable ] ) => {

	const Frequency = vec2( Frequency_immutable ).toVar();
	const ColorB = vec3( ColorB_immutable ).toVar();
	const ColorA = vec3( ColorA_immutable ).toVar();
	const UV = vec2( UV_immutable ).toVar();
	UV.assign( UV.xy.add( 0.5 ).mul( Frequency ) );
	const derivatives = vec4( dFdx( UV ), dFdy( UV ) ).toVar();
	const duv_length = vec2( sqrt( vec2( dot( derivatives.xz, derivatives.xz ), dot( derivatives.yw, derivatives.yw ) ) ) ).toVar();
	const width = float( 1.0 ).toVar();
	const distance3 = vec2( mul( 4.0, abs( fract( UV.add( 0.25 ) ).sub( 0.5 ) ) ).sub( width ) ).toVar();
	const scale = vec2( div( 0.35, duv_length.xy ) ).toVar();
	const freqLimiter = float( sqrt( clamp( sub( 1.1, max( duv_length.x, duv_length.y ) ), 0.0, 1.0 ) ) ).toVar();
	const vector_alpha = vec2( clamp( distance3.mul( scale.xy ), float( - 1.0 ), 1.0 ) ).toVar();
	const alpha = float( clamp( add( 0.5, mul( 0.5, vector_alpha.x ).mul( vector_alpha.y ).mul( freqLimiter ) ), 0.0, 1.0 ) ).toVar();

	return mix( ColorA, ColorB, vec3( alpha ) );

} ).setLayout( {
	name: 'checkerboard',
	type: 'vec3',
	inputs: [
		{ name: 'UV', type: 'vec2' },
		{ name: 'ColorA', type: 'vec3' },
		{ name: 'ColorB', type: 'vec3' },
		{ name: 'Frequency', type: 'vec2' }
	]
} );
