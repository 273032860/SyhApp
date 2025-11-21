// Three.js Transpiler r171

import {  Fn } from 'three/tsl';


export const tilingAndOffset = /*#__PURE__*/ Fn( ( [ uvs,tiling,offset ] ) => {

	return uvs.mul(tiling).add(offset);

} )
