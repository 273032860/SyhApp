// Three.js Transpiler r171

import { Fn } from 'three/tsl';


export const levels = /*#__PURE__*/ Fn( ( [ inV,backPoint,contrast,whitePoint,darkness,brightness ] ) => {
	const node1 = inV.sub(backPoint).saturate()
	const node2 = whitePoint.sub(backPoint)
	const node3 = node1.div(node2).pow(contrast).mul(brightness.sub(darkness)).add(darkness)
	return node3

} )
