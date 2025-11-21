// Three.js Transpiler r171

import { vec3, max, pow, mul, Fn } from 'three/tsl';

export const LinearToGammaSpace = /*#__PURE__*/ Fn( ( [ sRGB_immutable ] ) => {

	const sRGB = vec3( sRGB_immutable ).toVar();
	const linRGB = vec3( max( sRGB, vec3( 0., 0., 0. ) ) ).toVar();

	return max( mul( 1.055, vec3( pow( linRGB.x, 0.416666667 ), pow( linRGB.y, 0.416666667 ), pow( linRGB.z, 0.416666667 ) ) ).sub( 0.055 ), 0.0 );

} ).setLayout( {
	name: 'LinearToGammaSpace',
	type: 'vec3',
	inputs: [
		{ name: 'sRGB', type: 'vec3' }
	]
} );
