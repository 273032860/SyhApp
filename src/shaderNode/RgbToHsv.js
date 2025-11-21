// Three.js Transpiler r171

import { vec3, vec4, vec2, step, mix, min, float, mul, abs, Fn } from 'three/tsl';

export const RGBtoHSV = /*#__PURE__*/ Fn( ( [ c_immutable ] ) => {

	const c = vec3( c_immutable ).toVar();
	const K = vec4( 0.0, float( - 1.0 ).div( 3.0 ), 2.0 / 3.0, float( - 1.0 ) ).toVar();
	const p = vec4( mix( vec4( vec2( c.b, c.g ), vec2( K.w, K.z ) ), vec4( vec2( c.g, c.b ), vec2( K.x, K.y ) ), step( c.b, c.g ) ) ).toVar();
	const q = vec4( mix( vec4( p.xyw, c.r ), vec4( c.r, p.yzx ), step( p.x, c.r ) ) ).toVar();
	const d = float( q.x.sub( min( q.w, q.y ) ) ).toVar();
	const e = float( 1.0e-10 ).toVar();

	return vec3( abs( q.z.add( q.w.sub( q.y ).div( mul( 6.0, d ).add( e ) ) ) ), d.div( q.x.add( e ) ), q.x );

} ).setLayout( {
	name: 'RGBtoHSV',
	type: 'vec3',
	inputs: [
		{ name: 'c', type: 'vec3' }
	]
} );
