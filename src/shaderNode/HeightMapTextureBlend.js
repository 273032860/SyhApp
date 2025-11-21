// Three.js Transpiler r171

import { float, pow, clamp, vec3, Fn } from 'three/tsl';

/**
 * 此函数根据混合强度将两个纹理（HeightMap 和 SplatMask）进行混合。
 * 生成的遮罩值被限制在 0 到 1 的范围内，并作为 `vec3` 值返回。
 * 混合操作通过数学运算结合 HeightMap 和 SplatMask，允许自定义混合强度。
 *
 * @function heightMapTextureBlend
 * @param {number} HeightMap_immutable - 高度图值（通常为灰度纹理）。
 * @param {number} SplatMask_immutable - 涂抹遮罩值（用于纹理遮罩或混合）。
 * @param {number} BlendStrength_immutable - 一个浮动值，决定 HeightMap 和 SplatMask 混合的强度。
 * 
 * @returns {vec3} 返回一个 `vec3` 值，三个分量（R、G、B）相同，表示混合后的遮罩。
*/
export const heightMapTextureBlend = /*#__PURE__*/ Fn( ( [ HeightMap_immutable, SplatMask_immutable, BlendStrength_immutable ] ) => {

	const BlendStrength = float( BlendStrength_immutable ).toVar();
	const SplatMask = float( SplatMask_immutable ).toVar();
	const HeightMap = float( HeightMap_immutable ).toVar();
	const HeightMask = float( clamp( pow( HeightMap.mul( SplatMask ).mul( 4.0 ).add( SplatMask.mul( 2.0 ) ), BlendStrength ), 0.0, 1.0 ) ).toVar();

	return vec3( HeightMask, HeightMask, HeightMask );

} ).setLayout( {
	name: 'heightMapTextureBlend',
	type: 'vec3',
	inputs: [
		{ name: 'HeightMap', type: 'float' },
		{ name: 'SplatMask', type: 'float' },
		{ name: 'BlendStrength', type: 'float' }
	]
} );
