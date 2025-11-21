// Three.js Transpiler r171

import { vec2, fract, round, mul, sub, Fn, float } from 'three/tsl';

/**
 * 根据输入值生成方波输出。
 * 
 * `SquareWave` 函数根据给定的二维向量输入生成方波。方波的输出在 1.0 和 -1.0 之间交替变化，基于输入的分数部分计算。
 * 
 * 公式：
 * ```
 * SquareWave(inVal) = 1.0 - 2.0 * round(fract(inVal))
 * ```
 * 
 * ### 参数：
 * - **`inVal`** (`vec2`): 输入的二维向量，每个分量都用于生成对应的方波。
 * 
 * ### 返回值：
 * - **`vec2`**: 包含每个输入分量对应的方波值的二维向量。
 * 
*/
export const squareWave = /*#__PURE__*/ Fn( ( [ inVal_immutable ] ) => {

	const inVal = float( inVal_immutable ).toVar();

	return sub( 1.0, mul( 2.0, round( fract( inVal ) ) ) );

} ).setLayout( {
	name: 'SquareWave',
	type: 'float',
	inputs: [
		{ name: 'inVal', type: 'float' }
	]
} );
