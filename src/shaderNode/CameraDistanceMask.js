// Three.js Transpiler r171

import { cameraPosition, Fn, positionWorld, saturate } from 'three/tsl';



export const cameraDistanceMask = /*#__PURE__*/ Fn( ( [ startDistance,length ] ) => {
	const node1 = cameraPosition.distance(positionWorld)
    const node2 = node1.sub(startDistance)
    const node3 = node2.div(length)
    const node4 = saturate(node3)
    return node4
} )
 