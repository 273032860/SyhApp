// Three.js Transpiler r172

import { float, int, vec2, cos, atan, mul, add, floor, length, sub, fwidth, clamp, Fn } from 'three/tsl';

/**
 * **polygon 函数** - 用于生成正多边形的遮罩效果。
 * 
 * 此函数使用 Three.js 的 TSL（Transpiler Shader Language）语法来实现，通过 UV 坐标、边数和宽高比例，计算并返回一个遮罩值，用于渲染正多边形。
 * 
 * @function polygon
 * @param {vec2} UV - 输入的 UV 坐标，范围通常为 [0,1]。
 * @param {int} sides - 多边形的边数，例如三角形为 3，正方形为 4，五边形为 5。
 * @param {float} width - 多边形的宽度比例。
 * @param {float} height - 多边形的高度比例。
 * @returns {float} 返回遮罩值，范围在 [0,1] 之间，用于确定当前像素是否在多边形内。
 * 
 */
export const polygon = /*#__PURE__*/ Fn( ( [ UV_immutable, sides_immutable, width_immutable, height_immutable ] ) => {

	const height = float( height_immutable ).toVar();
	const width = float( width_immutable ).toVar();
	const sides = int( sides_immutable ).toVar();
	const UV = vec2( UV_immutable ).toVar();
	const pi = float( 3.14159265359 ).toVar();
	const aWidth = float( width.mul( cos( pi.div( float( sides ) ) ) ) ).toVar();
	const aHeight = float( height.mul( cos( pi.div( float( sides ) ) ) ) ).toVar();
	const uv = vec2( UV.mul( 2.0 ).sub( 1.0 ).div( vec2( aWidth, aHeight ) ) ).toVar();
	uv.y.mulAssign( float( - 1.0 ) );
	const pCoord = float( atan( uv.x, uv.y ) ).toVar();
	const r = float( mul( 2.0, pi ).div( float( sides ) ) ).toVar();
	const distance = float( cos( floor( add( 0.5, pCoord.div( r ) ) ).mul( r ).sub( pCoord ) ).mul( length( uv ) ) ).toVar();

	return clamp( sub( 1.0, distance ).div( fwidth( distance ) ), 0.0, 1.0 );

} ).setLayout( {
	name: 'polygon',
	type: 'float',
	inputs: [
		{ name: 'UV', type: 'vec2' },
		{ name: 'sides', type: 'int' },
		{ name: 'width', type: 'float' },
		{ name: 'height', type: 'float' }
	]
} );
