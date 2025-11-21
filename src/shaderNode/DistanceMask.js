// Three.js Transpiler r171

import { cameraPosition, Fn, positionWorld } from 'three/tsl';


export const distanceMask = /*#__PURE__*/ Fn( ( [ distance,offset ] ) => {

	return cameraPosition.distance(positionWorld).sub(offset).div(distance).saturate().oneMinus()
} )
