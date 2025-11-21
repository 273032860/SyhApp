// Three.js Transpiler r171

import { vec2, uv, dot, sin, fract, Fn, float } from 'three/tsl';

export const random_lGLGo1nAZDPE = /*#__PURE__*/ Fn( ( [ uv_immutable ] ) => {

	const uv = vec2( uv_immutable ).toVar();

	return fract( sin( dot( uv.xy, vec2( 12.9898, 78.233 ) ) ).mul( 43758.5453123 ) );

} ).setLayout( {
	name: 'random_lGLGo1nAZDPE',
	type: 'float',
	inputs: [
		{ name: 'uv', type: 'vec2' }
	]
} );

export const random2D = /*#__PURE__*/ Fn( ( [ scale_immutable, uv_immutable ] ) => {

	const uv = vec2( uv_immutable ).toVar();
	const scale = float( scale_immutable ).toVar();
	const rdn = float( random_lGLGo1nAZDPE( uv.mul( scale ) ) ).toVar();

	return rdn;

} ).setLayout( {
	name: 'random2D',
	type: 'float',
	inputs: [
		{ name: 'scale', type: 'float' },
		{ name: 'uv', type: 'vec2' }
	]
} );
