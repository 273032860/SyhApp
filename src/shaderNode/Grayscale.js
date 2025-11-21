// Three.js Transpiler r171

import { vec3, dot, Fn, clamp, float, grayscale } from 'three/tsl';

const Luminance_4SEvmlrkxOcG = /*#__PURE__*/ Fn( ( [ RGB_immutable, RGBweights_immutable ] ) => {

	const RGBweights = vec3( RGBweights_immutable ).toVar();
	const RGB = vec3( RGB_immutable ).toVar();

	return dot( RGB, RGBweights ).div( RGBweights.x.add( RGBweights.y ).add( RGBweights.z ) );

} ).setLayout( {
	name: 'Luminance_4SEvmlrkxOcG',
	type: 'float',
	inputs: [
		{ name: 'RGB', type: 'vec3' },
		{ name: 'RGBweights', type: 'vec3' }
	]
} );

/**
 * 用于将 RGB 颜色转换为基于自定义权重因子的灰度值的函数。
 * 
 * 此函数通过加权的亮度公式计算灰度值。它接受一个不可变的 RGB 向量和红、绿、蓝通道的权重因子，
 * 将权重限制在 0 到 1 的范围内，然后计算出灰度值。
 * 
 * @function Grayscale
 * @param {vec3} RGB_immutable - 不可变的 RGB 颜色，表示为具有三个分量 (R, G, B) 的向量。
 * @param {float} r - 红色通道的权重。范围限制为 0.0 到 1.0。
 * @param {float} g - 绿色通道的权重。范围限制为 0.0 到 1.0。
 * @param {float} b - 蓝色通道的权重。范围限制为 0.0 到 1.0。
 * @returns {float} - 计算出的灰度值，表示为一个浮点数。
 * 
 * @example
* // 示例用法：
* const RGB = vec3(0.5, 0.8, 0.2);
* const grayscaleValue = Grayscale(RGB, 0.3, 0.59, 0.11);
*/
export const grayscale = /*#__PURE__*/ Fn( ( [ RGB_immutable,r,g,b ] ) => {

	const RGB = vec3( RGB_immutable ).toVar();
	const Rweight = float( clamp( r, 0.0, 1.0 ) ).toVar();
	const Gweight = float( clamp( g, 0.0, 1.0 ) ).toVar();
	const Bweight = float( clamp( b, 0.0, 1.0 ) ).toVar();
	const grayscale1 = float( Luminance_4SEvmlrkxOcG( RGB, vec3( Rweight, Gweight, Bweight ) ) ).toVar();

	return grayscale1;

} ).setLayout( {
	name: 'Grayscale',
	type: 'float',
	inputs: [
		{ name: 'RGB', type: 'vec3' },
		{ name: 'r', type: 'float' },
		{ name: 'g', type: 'float' },
		{ name: 'b', type: 'float' }
	]
} );
