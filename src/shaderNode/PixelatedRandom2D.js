// Three.js Transpiler r171

import { vec2, uv, dot, sin, fract, Fn, float, floor } from 'three/tsl';

export const random_Vz5lkukcAvnY = /*#__PURE__*/ Fn( ( [ uv_immutable ] ) => {

	const uv = vec2( uv_immutable ).toVar();

	return fract( sin( dot( uv.xy, vec2( 12.9898, 78.233 ) ) ).mul( 43758.5453123 ) );

} ).setLayout( {
	name: 'random_Vz5lkukcAvnY',
	type: 'float',
	inputs: [
		{ name: 'uv', type: 'vec2' }
	]
} );

export const pixelatedRandom2D = /*#__PURE__*/ Fn( ( [ scale_immutable, resolution_immutable, uv_immutable ] ) => {

	const uv = vec2( uv_immutable ).toVar();
	const resolution = float( resolution_immutable ).toVar();
	const scale = float( scale_immutable ).toVar();
	const ipos = vec2( floor( uv.mul( resolution ) ) ).toVar();
	const rdn = float( random_Vz5lkukcAvnY( ipos.mul( scale ) ) ).toVar();

	return rdn;

} ).setLayout( {
	name: 'pixelatedRandom2D',
	type: 'float',
	inputs: [
		{ name: 'scale', type: 'float' },
		{ name: 'resolution', type: 'float' },
		{ name: 'uv', type: 'vec2' }
	]
} );
