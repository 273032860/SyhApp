// Three.js Transpiler r171

import { float, vec3, pow, mul, log, If, clamp, Fn, uv } from 'three/tsl';


export const normalFromTexture = /*#__PURE__*/ Fn( ( [ inputTex_immutable, offset,strength ] ) => {
	const inputTex = inputTex_immutable
	const node1 = float(offset).pow(3).mul(0.1)
	const node2 = vec2(node1,0)
	const node3 = vec2(0,node1)
	const uvs = uv()
	const node4 = node2.add(uvs)
	const node5 = node3.add(uvs)
	const node6 = texture(inputTex,uvs)
	const node7 = texture(inputTex,node4)
	const node8 = texture(inputTex,node5)
	const node9 = node7.r.sub(node6.r)
	const node10 = node8.r.sub(node6.r)
	const node11 = node9.mul(strength)
	const node12 = node10.mul(strength)
	const node13 = vec3(1,0,node11)
	const node14 = vec3(0,1,node12)
	const node15 = node13.cross(node14).normalize()

	return color;

} )