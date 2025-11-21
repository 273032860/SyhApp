// Three.js Transpiler r171

import { cross, Fn, normalView, positionView, vec2 } from 'three/tsl';

export const uvsphereMap = /*#__PURE__*/ Fn( ( ) => {

	const node1 = positionView.normalize()
	const node2 = cross(node1,normalView)
	const node3 = vec2(node2.y,node2.x).mul(vec2(-0.5,0.5)).add(vec2(0.5,0.5))
	return node3
} )
