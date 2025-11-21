// Three.js Transpiler r171

import { Fn } from 'three/tsl';


export const brightnessContrast = /*#__PURE__*/ Fn( ( [inV,brightness,contrast] ) => {
	return inV.add(brightness).sub(0.5).mul(contrast).add(0.5)
} )