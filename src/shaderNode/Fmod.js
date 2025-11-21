// Three.js Transpiler r171

import { vec4, trunc, Fn } from 'three/tsl';

export const Fmod = /*#__PURE__*/ Fn( ( [ x_immutable, y_immutable ] ) => {

	const y = vec4( y_immutable ).toVar();
	const x = vec4( x_immutable ).toVar();
	const Fmod = vec4( x.sub( y.mul( trunc( x.div( y ) ) ) ) ).toVar();

	return Fmod;

} ).setLayout( {
	name: 'Fmod',
	type: 'vec4',
	inputs: [
		{ name: 'x', type: 'vec4' },
		{ name: 'y', type: 'vec4' }
	]
} );
