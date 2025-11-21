// Three.js Transpiler r171

import { vec3, vec4, fract, abs, clamp, mix, Fn, float } from 'three/tsl';

export const HSVToRGB_mWiaMgOpEjXJ = /*#__PURE__*/ Fn( ( [ c_immutable ] ) => {

	const c = vec3( c_immutable ).toVar();
	const K = vec4( 1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0 ).toVar();
	const p = vec3( abs( fract( vec3( c.x, c.x, c.x ).add( vec3( K.x, K.y, K.z ) ) ).mul( 6.0 ).sub( vec3( K.w, K.w, K.w ) ) ) ).toVar();

	return c.z.mul( mix( vec3( K.x, K.x, K.x ), clamp( p.sub( vec3( K.x, K.x, K.x ) ), 0.0, 1.0 ), c.y ) );

} ).setLayout( {
	name: 'HSVToRGB_mWiaMgOpEjXJ',
	type: 'vec3',
	inputs: [
		{ name: 'c', type: 'vec3' }
	]
} );

export const HslToRGB = /*#__PURE__*/ Fn( ( [ Hue_immutable, Saturation_immutable, Value_immutable ] ) => {

	const Value = float( Value_immutable ).toVar();
	const Saturation = float( Saturation_immutable ).toVar();
	const Hue = float( Hue_immutable ).toVar();
	const HSVtoRGB = vec3( HSVToRGB_mWiaMgOpEjXJ( vec3( Hue, Saturation, Value ) ) ).toVar();

	return HSVtoRGB;

} ).setLayout( {
	name: 'HslToRGB',
	type: 'vec3',
	inputs: [
		{ name: 'Hue', type: 'float' },
		{ name: 'Saturation', type: 'float' },
		{ name: 'Value', type: 'float' }
	]
} );
