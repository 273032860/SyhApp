// Three.js Transpiler r171

import { vec2, mix, dot, sin, fract, Fn, float } from 'three/tsl';

export const randonRange = /*#__PURE__*/ Fn( ( [ seed_immutable,min_immutable,max_immutable ] ) => {


	const min = float( min_immutable ).toVar();
	const max = float( max_immutable ).toVar();

	return mix(min,max,fract(sin(dot(vec2(seed_immutable),vec2(12.9898,78.233))).mul(43758.5453)));

} )