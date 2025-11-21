// Three.js Transpiler r171

import { vec3, floor, Fn, vec4, overloadingFn, sub, vec2, dot, step, min, max, mul, abs, float, uv } from 'three/tsl';

export const mod3D289_dRtETCExVWxq_0 = /*#__PURE__*/ Fn( ( [ x_immutable ] ) => {

	const x = vec3( x_immutable ).toVar();

	return x.sub( floor( x.div( 289.0 ) ).mul( 289.0 ) );

} ).setLayout( {
	name: 'mod3D289_dRtETCExVWxq_0',
	type: 'vec3',
	inputs: [
		{ name: 'x', type: 'vec3' }
	]
} );

export const mod3D289_dRtETCExVWxq_1 = /*#__PURE__*/ Fn( ( [ x_immutable ] ) => {

	const x = vec4( x_immutable ).toVar();

	return x.sub( floor( x.div( 289.0 ) ).mul( 289.0 ) );

} ).setLayout( {
	name: 'mod3D289_dRtETCExVWxq_1',
	type: 'vec4',
	inputs: [
		{ name: 'x', type: 'vec4' }
	]
} );

export const mod3D289_dRtETCExVWxq = /*#__PURE__*/ overloadingFn( [ mod3D289_dRtETCExVWxq_0, mod3D289_dRtETCExVWxq_1 ] );

export const permute_dRtETCExVWxq = /*#__PURE__*/ Fn( ( [ x_immutable ] ) => {

	const x = vec4( x_immutable ).toVar();

	return mod3D289_dRtETCExVWxq( x.mul( 34.0 ).add( 1.0 ).mul( x ) );

} ).setLayout( {
	name: 'permute_dRtETCExVWxq',
	type: 'vec4',
	inputs: [
		{ name: 'x', type: 'vec4' }
	]
} );

export const taylorInvSqrt_dRtETCExVWxq = /*#__PURE__*/ Fn( ( [ r_immutable ] ) => {

	const r = vec4( r_immutable ).toVar();

	return sub( 1.79284291400159, r.mul( 0.85373472095314 ) );

} ).setLayout( {
	name: 'taylorInvSqrt_dRtETCExVWxq',
	type: 'vec4',
	inputs: [
		{ name: 'r', type: 'vec4' }
	]
} );

export const snoise_dRtETCExVWxq = /*#__PURE__*/ Fn( ( [ v_immutable ] ) => {

	const v = vec3( v_immutable ).toVar();
	const C = vec2( 1.0 / 6.0, 1.0 / 3.0 );
	const i = vec3( floor( v.add( dot( v, C.yyy ) ) ) ).toVar();
	const x0 = vec3( v.sub( i ).add( dot( i, C.xxx ) ) ).toVar();
	const g = vec3( step( x0.yzx, x0.xyz ) ).toVar();
	const l = vec3( sub( 1.0, g ) ).toVar();
	const i1 = vec3( min( g.xyz, l.zxy ) ).toVar();
	const i2 = vec3( max( g.xyz, l.zxy ) ).toVar();
	const x1 = vec3( x0.sub( i1 ).add( C.xxx ) ).toVar();
	const x2 = vec3( x0.sub( i2 ).add( C.yyy ) ).toVar();
	const x3 = vec3( x0.sub( 0.5 ) ).toVar();
	i.assign( mod3D289_dRtETCExVWxq( i ) );
	const p = vec4( permute_dRtETCExVWxq( permute_dRtETCExVWxq( permute_dRtETCExVWxq( i.z.add( vec4( 0.0, i1.z, i2.z, 1.0 ) ) ).add( i.y ).add( vec4( 0.0, i1.y, i2.y, 1.0 ) ) ).add( i.x ).add( vec4( 0.0, i1.x, i2.x, 1.0 ) ) ) ).toVar();
	const j = vec4( p.sub( mul( 49.0, floor( p.div( 49.0 ) ) ) ) ).toVar();
	const x_ = vec4( floor( j.div( 7.0 ) ) ).toVar();
	const y_ = vec4( floor( j.sub( mul( 7.0, x_ ) ) ) ).toVar();
	const x = vec4( x_.mul( 2.0 ).add( 0.5 ).div( 7.0 ).sub( 1.0 ) ).toVar();
	const y = vec4( y_.mul( 2.0 ).add( 0.5 ).div( 7.0 ).sub( 1.0 ) ).toVar();
	const h = vec4( sub( 1.0, abs( x ) ).sub( abs( y ) ) ).toVar();
	const b0 = vec4( x.xy, y.xy ).toVar();
	const b1 = vec4( x.zw, y.zw ).toVar();
	const s0 = vec4( floor( b0 ).mul( 2.0 ).add( 1.0 ) ).toVar();
	const s1 = vec4( floor( b1 ).mul( 2.0 ).add( 1.0 ) ).toVar();
	const sh = vec4( step( h, vec4( 0.0, 0.0, 0.0, 0.0 ) ).negate() ).toVar();
	const a0 = vec4( b0.xzyw.add( s0.xzyw.mul( sh.xxyy ) ) ).toVar();
	const a1 = vec4( b1.xzyw.add( s1.xzyw.mul( sh.zzww ) ) ).toVar();
	const g0 = vec3( a0.xy, h.x ).toVar();
	const g1 = vec3( a0.zw, h.y ).toVar();
	const g2 = vec3( a1.xy, h.z ).toVar();
	const g3 = vec3( a1.zw, h.w ).toVar();
	const norm = vec4( taylorInvSqrt_dRtETCExVWxq( vec4( dot( g0, g0 ), dot( g1, g1 ), dot( g2, g2 ), dot( g3, g3 ) ) ) ).toVar();
	g0.mulAssign( norm.x );
	g1.mulAssign( norm.y );
	g2.mulAssign( norm.z );
	g3.mulAssign( norm.w );
	const m = vec4( max( sub( 0.6, vec4( dot( x0, x0 ), dot( x1, x1 ), dot( x2, x2 ), dot( x3, x3 ) ) ), 0.0 ) ).toVar();
	m.assign( m.mul( m ) );
	m.assign( m.mul( m ) );
	const px = vec4( dot( x0, g0 ), dot( x1, g1 ), dot( x2, g2 ), dot( x3, g3 ) ).toVar();

	return mul( 42.0, dot( m, px ) );

} ).setLayout( {
	name: 'snoise_dRtETCExVWxq',
	type: 'float',
	inputs: [
		{ name: 'v', type: 'vec3' }
	]
} );

export const simplex3D = /*#__PURE__*/ Fn( ( [ uv_immutable, scale_immutable ] ) => {

	const scale = float( scale_immutable ).toVar();
	const uv = vec2( uv_immutable ).toVar();
	const noise = float( snoise_dRtETCExVWxq( vec3( uv.x, uv.y, 0.0 ).mul( scale ) ) ).toVar();
	noise.assign( noise.mul( 0.5 ).add( 0.5 ) );

	return noise;

} ).setLayout( {
	name: 'simplex3D',
	type: 'float',
	inputs: [
		{ name: 'uv', type: 'vec2' },
		{ name: 'scale', type: 'float' }
	]
} );
