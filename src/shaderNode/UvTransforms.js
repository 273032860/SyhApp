// Three.js Transpiler r171

import { Fn, uv, vec2 } from 'three/tsl';

/**
 * UV 坐标变换函数
 * @param {Object} params - 变换参数
 * @param {vec2} [params.uvs=uv()] - 输入的 UV 坐标
 * @param {vec2} [params.offset=vec2(0)] - UV 偏移量
 * @param {number} [params.rotation=0] - 旋转角度（弧度）
 * @param {vec2} [params.scale=vec2(1)] - 缩放因子
 * @param {vec2} [params.pivot=vec2(0.5)] - 旋转和缩放的中心点
 * @returns {vec2} 变换后的 UV 坐标
 */
export const uvTransforms = /*#__PURE__*/ Fn( ( [uvs=uv(),offset=vec2(0),rotation=0,scale=vec2(1),pivot=vec2(0.5)] ) => {

	const node = uvs.sub(pivot)
	const node1 = rotation.cos().mul(node.r)
	const node2 = rotation.sin().mul(node.g)
	const node3 = rotation.cos().mul(node.g)
	const node4 = rotation.sin().mul(node.r)
	const node5 = vec2(node1.add(node2),node3.sub(node4))
	const node6 = node5.mul(scale).add(pivot).add(offset)
	return node6
} )
 