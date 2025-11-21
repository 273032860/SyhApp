// Three.js Transpiler r171

import { Fn } from 'three/tsl';


export const fadeTransition = /*#__PURE__*/ Fn( ( [ noiseV,fadeV,fadeC ] ) => {

	const node1 = fadeV
	const node2 = fadeC.add(1)
	const node3=  noiseV.sub(1)
	const node4 = node2.mul(node3)
	const node5 = node1.mul(node2).add(node4)
	return node5

} )
