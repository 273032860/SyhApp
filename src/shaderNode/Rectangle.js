// Three.js Transpiler r172

import { float, vec2, abs, fwidth, sub, min, clamp, Fn } from 'three/tsl';

/**
 * **rectangle 函数** - 用于生成矩形的遮罩效果。
 * 
 * 此函数使用 Three.js 的 TSL（Transpiler Shader Language）语法，通过输入的 UV 坐标、矩形的宽度和高度，生成一个用于渲染矩形形状的遮罩值。
 * 
 * @function rectangle
 * @param {vec2} uv - 输入的 UV 坐标，范围通常为 [0,1]。
 * @param {float} width - 矩形的宽度比例，范围在 [0,1]。
 * @param {float} height - 矩形的高度比例，范围在 [0,1]。
 * @returns {float} 返回遮罩值，范围在 [0,1] 之间，用于确定当前像素是否在矩形内部。
 */
export const rectangle = /*#__PURE__*/ Fn( ( [ uv_immutable, width_immutable, height_immutable ] ) => {

	const height = float( height_immutable ).toVar();
	const width = float( width_immutable ).toVar();
	const uv = vec2( uv_immutable ).toVar();
	const d = vec2( abs( uv.mul( 2.0 ).sub( 1.0 ) ).sub( vec2( width, height ) ) ).toVar();
	d.assign( sub( 1.0, d.div( fwidth( d ) ) ) );

	return clamp( min( d.x, d.y ), 0.0, 1.0 );

} ).setLayout( {
	name: 'rectangle',
	type: 'float',
	inputs: [
		{ name: 'uv', type: 'vec2' },
		{ name: 'width', type: 'float' },
		{ name: 'height', type: 'float' }
	]
} );
