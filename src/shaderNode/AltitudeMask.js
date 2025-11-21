// Three.js Transpiler r171

import {   Fn, positionLocal, saturate, smoothstep } from 'three/tsl';


export const altitudeMaskLinear = /*#__PURE__*/ Fn( ( [ minimum=1,maximum=2 ] ) => {

	 
	const node1 = positionLocal.y
	const node2 = node1.sub(minimum)
	const node3 = maximum.sub(minimum)
	const node4 = node2.div(node3)
	const node5 = saturate(node4)
	return node5
} )
export const altitudeMaskSmoothstep = /*#__PURE__*/ Fn( ( [ minimum=1,maximum=2 ] ) => {

	 
	const node1 = positionLocal.y
	const node6 = smoothstep(minimum,maximum,node1)
	
	return node6

} )