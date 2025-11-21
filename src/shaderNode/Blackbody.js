// Three.js Transpiler r171

import { float, vec3, pow, mul, log, If, clamp, Fn } from 'three/tsl';

/**
 * @description 黑体辐射颜色计算函数
 * @function Blackbody
 * @param {number} temperature_immutable - 温度值（开尔文）
 * @returns {vec3} 返回RGB颜色值，范围在[0,1]之间
 * @description 该函数根据给定温度计算黑体辐射的颜色。Blackbody(5200太阳光)
 */
export const blackbody = /*#__PURE__*/ Fn( ( [ temperature_immutable ] ) => {

	const temperature = float( temperature_immutable ).toVar();
	const color = vec3( 255.0, 255.0, 255.0 ).toVar();
	color.x.assign( mul( 56100000., pow( temperature, float( - 3.0 ).div( 2.0 ) ) ).add( 148.0 ) );
	color.y.assign( mul( 100.04, log( temperature ) ).sub( 623.6 ) );

	If( temperature.greaterThan( 6500.0 ), () => {

		color.y.assign( mul( 35200000.0, pow( temperature, float( - 3.0 ).div( 2.0 ) ) ).add( 184.0 ) );

	} );

	color.z.assign( mul( 194.18, log( temperature ) ).sub( 1448.6 ) );
	color.assign( clamp( color, 0.0, 255.0 ).div( 255.0 ) );

	If( temperature.lessThan( 1000.0 ), () => {

		color.mulAssign( temperature.div( 1000.0 ) );

	} );

	return color;

} ).setLayout( {
	name: 'Blackbody',
	type: 'vec3',
	inputs: [
		{ name: 'temperature', type: 'float' }
	]
} );
