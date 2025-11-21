import { vec3, Fn } from 'three/tsl';

export const GammaToLinearSpace = /*#__PURE__*/ Fn( ( [ sRGB_immutable ] ) => {

	const sRGB = vec3( sRGB_immutable ).toVar();

	return sRGB.mul( sRGB.mul( sRGB.mul( 0.305306011 ).add( 0.682171111 ) ).add( 0.012522878 ) );

} ).setLayout( {
	name: 'GammaToLinearSpace',
	type: 'vec3',
	inputs: [
		{ name: 'sRGB', type: 'vec3' }
	]
} );