// Three.js Transpiler r171

import {   Fn, positionLocal, vec3  } from 'three/tsl';


export const decalEdgeMask = /*#__PURE__*/ Fn( ( [ sharpness ] ) => {
	const node1 = positionLocal.add(vec3(0.5))
	const node2 = node1.mul(node1.oneMinus())
	const node3 = node2.x.mul(node2.y).mul(node2.z)
	const node4 = node3.mul(node3).mul(sharpness).saturate()
	return node4
} )
 