// Three.js Transpiler r171

import { Fn } from 'three/tsl';

export const sphereMask = /*#__PURE__*/ Fn( ( [ coords,center,radius,hardness ] ) => {

	const node1 = coords.distance(center).sub(radius).saturate().div(hardness.oneMinus()).oneMinus()
	return node1

} )