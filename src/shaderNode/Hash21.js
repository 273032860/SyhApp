// Three.js Transpiler r175

import { vec2, dot, float, sin, fract, Fn } from 'three/tsl';

export const hash21 = /*#__PURE__*/ Fn( ( [ p_immutable ] ) => {

	const p = vec2( p_immutable ).toVar();
	const dotVal = float( dot( p, vec2( 127.1, 311.7 ) ) ).toVar();
	const sinVal = float( sin( dotVal ).mul( 43758.5453 ) ).toVar();

	return fract( sinVal );

} ).setLayout( {
	name: 'hash21',
	type: 'float',
	inputs: [
		{ name: 'p', type: 'vec2' }
	]
} );