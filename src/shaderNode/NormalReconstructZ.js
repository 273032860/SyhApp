// Three.js Transpiler r171

import { float, vec3, pow, mul, log, If, clamp, Fn } from 'three/tsl';


export const normalReconstructZ = /*#__PURE__*/ Fn( ( [ inVec2 ] ) => {

	const node1 = inVec2
	const node2 = node1.dot(node1).saturate().oneMinus().sqrt()
	return vec3(node1,node2).normalize()

} )
