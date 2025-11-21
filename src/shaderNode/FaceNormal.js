// Three.js Transpiler r171

import {   Fn, positionGeometry, positionLocal, positionView, positionWorld  } from 'three/tsl';


export const faceNoemalLocal = /*#__PURE__*/ Fn( () => {

	const node1 = positionLocal.dFdx()
	const node2 = positionLocal.dFdy()
	const node3 = node1.cross(node2).normalize()
	return  node3
} )
export const faceNoemalWorld = /*#__PURE__*/ Fn( () => {

	const node1 = positionWorld.dFdx()
	const node2 = positionWorld.dFdy()
	const node3 = node1.cross(node2).normalize()
	return  node3
} )
export const faceNoemalView = /*#__PURE__*/ Fn( () => {

	const node1 = positionView.dFdx()
	const node2 = positionView.dFdy()
	const node3 = node1.cross(node2).normalize()
	return  node3
} )
export const faceNoemalGeometry = /*#__PURE__*/ Fn( () => {

	const node1 = positionGeometry.dFdx()
	const node2 = positionGeometry.dFdy()
	const node3 = node1.cross(node2).normalize()
	return  node3
} )
