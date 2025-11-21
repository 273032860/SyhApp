// Three.js Transpiler r171

import { float, Fn, vec3 } from 'three/tsl';

/**
 * 反向线性插值函数
 * @function InverseLerp
 * @param {number} a_immutable - 起始值
 * @param {number} b_immutable - 结束值
 * @param {number} v_immutable - 当前值
 * @returns {number} 返回当前值在起始值和结束值之间的归一化位置 (0-1)
 * @description
 * 计算一个值在给定范围内的相对位置：
InverseLerp(0, 10, 5) = 0.5（5在0和10之间的位置是50%）
InverseLerp(0, 10, 2) = 0.2（2在0和10之间的位置是20%）
mix(0, 10, 0.5) = 5（取0和10之间50%的位置的值）
mix(0, 10, 0.2) = 2（取0和10之间20%的位置的值）
 */
export const inverseLerp = /*#__PURE__*/ Fn( ( [ a_immutable, b_immutable, v_immutable ] ) => {

	const v = float( v_immutable ).toVar();
	const b = float( b_immutable ).toVar();
	const a = float( a_immutable ).toVar();
	const nodeVar0 = float( v.sub( a ).div( b.sub( a ) ) ).toVar();

	return nodeVar0;

} ).setLayout( {
	name: 'inverseLerp',
	type: 'float',
	inputs: [
		{ name: 'a', type: 'float', qualifier: 'in' },
		{ name: 'b', type: 'float', qualifier: 'in' },
		{ name: 'v', type: 'float', qualifier: 'in' }
	]
} );

