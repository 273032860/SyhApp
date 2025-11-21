// Three.js Transpiler r171

import { vec4, Fn, positionLocal, modelViewMatrix } from 'three/tsl';

export const surfaceDepth = /*#__PURE__*/ Fn( (  ) => {
	const sd = vec4( modelViewMatrix.mul( positionLocal ) ).toVar();
	return sd.z.negate();

} )
