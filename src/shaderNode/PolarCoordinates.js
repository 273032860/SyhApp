// Three.js Transpiler r171

import { float, vec2, uv, length, atan2, mul, Fn,fract,time } from 'three/tsl';

/**
 * 极坐标转换函数
 * 将笛卡尔坐标系(UV坐标)转换为极坐标系(半径和角度)
 * 
 * @param {vec2} uv_immutable - 输入的UV坐标
 * @param {vec2} center_immutable - 极坐标系的中心点
 * @param {float} radialScale_immutable - 半径缩放因子
 * @param {float} lengthScale_immutable - 角度缩放因子
 * @returns {vec2} 返回极坐标，x分量为半径，y分量为角度(0-1范围)
 */
export const polarCoordinates = /*#__PURE__*/ Fn( ( [ uv_immutable, center_immutable, radialScale_immutable, lengthScale_immutable ] ) => {

	const lengthScale = float( lengthScale_immutable ).toVar();
	const radialScale = float( radialScale_immutable ).toVar();
	const center = vec2( center_immutable ).toVar();
	const uv = vec2( uv_immutable ).toVar();
	const delta = vec2( uv.sub( center ) ).toVar();
	const radius = float( length( delta ).mul( 2.0 ).mul( radialScale )).toVar();
 
	const angle = float( atan2( delta.y, delta.x ).mul( 1.0 ).div( mul( 6.28, lengthScale ) ) ).toVar();

	return vec2( radius, angle );

} ).setLayout( {
	name: 'polarCoordinates',
	type: 'vec2',
	inputs: [
		{ name: 'uv', type: 'vec2' },
		{ name: 'center', type: 'vec2' },
		{ name: 'radialScale', type: 'float' },
		{ name: 'lengthScale', type: 'float' }
	]
} );
