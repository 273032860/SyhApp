// Three.js Transpiler r171

import { vec2, uv, dot, sin, fract, Fn, float, sub, floor, mul, abs, int, pow } from 'three/tsl';

export const noise_randomValue_dRtETCExVWxq = /*#__PURE__*/ Fn( ( [ uv_immutable ] ) => {

	const uv = vec2( uv_immutable ).toVar();

	return fract( sin( dot( uv, vec2( 12.9898, 78.233 ) ) ).mul( 43758.5453 ) );

} ).setLayout( {
	name: 'noise_randomValue_dRtETCExVWxq',
	type: 'float',
	inputs: [
		{ name: 'uv', type: 'vec2' }
	]
} );

export const noise_interpolate_dRtETCExVWxq = /*#__PURE__*/ Fn( ( [ a_immutable, b_immutable, t_immutable ] ) => {

	const t = float( t_immutable ).toVar();
	const b = float( b_immutable ).toVar();
	const a = float( a_immutable ).toVar();

	return sub( 1.0, t ).mul( a ).add( t.mul( b ) );

} ).setLayout( {
	name: 'noise_interpolate_dRtETCExVWxq',
	type: 'float',
	inputs: [
		{ name: 'a', type: 'float' },
		{ name: 'b', type: 'float' },
		{ name: 't', type: 'float' }
	]
} );

export const valueNoise_dRtETCExVWxq = /*#__PURE__*/ Fn( ( [ uv_immutable ] ) => {

	const uv = vec2( uv_immutable ).toVar();
	const i = vec2( floor( uv ) ).toVar();
	const f = vec2( fract( uv ) ).toVar();
	f.assign( f.mul( f ).mul( sub( 3.0, mul( 2.0, f ) ) ) );
	uv.assign( abs( fract( uv ).sub( 0.5 ) ) );
	const c0 = vec2( i.add( vec2( 0.0, 0.0 ) ) ).toVar();
	const c1 = vec2( i.add( vec2( 1.0, 0.0 ) ) ).toVar();
	const c2 = vec2( i.add( vec2( 0.0, 1.0 ) ) ).toVar();
	const c3 = vec2( i.add( vec2( 1.0, 1.0 ) ) ).toVar();
	const r0 = float( noise_randomValue_dRtETCExVWxq( c0 ) ).toVar();
	const r1 = float( noise_randomValue_dRtETCExVWxq( c1 ) ).toVar();
	const r2 = float( noise_randomValue_dRtETCExVWxq( c2 ) ).toVar();
	const r3 = float( noise_randomValue_dRtETCExVWxq( c3 ) ).toVar();
	const bottomOfGrid = float( noise_interpolate_dRtETCExVWxq( r0, r1, f.x ) ).toVar();
	const topOfGrid = float( noise_interpolate_dRtETCExVWxq( r2, r3, f.x ) ).toVar();
	const t = float( noise_interpolate_dRtETCExVWxq( bottomOfGrid, topOfGrid, f.y ) ).toVar();

	return t;

} ).setLayout( {
	name: 'valueNoise_dRtETCExVWxq',
	type: 'float',
	inputs: [
		{ name: 'uv', type: 'vec2' }
	]
} );

export const SimpleNoise_dRtETCExVWxq = /*#__PURE__*/ Fn( ( [ v_immutable ] ) => {

	const v = vec2( v_immutable ).toVar();
	const t = float( 0.0 ).toVar();
	const freq = float( pow( 2.0, float( int( 0 ) ) ) ).toVar();
	const amp = float( pow( 0.5, float( int( 3 ).sub( int( 0 ) ) ) ) ).toVar();
	t.addAssign( valueNoise_dRtETCExVWxq( v.div( freq ) ).mul( amp ) );
	freq.assign( pow( 2.0, float( int( 1 ) ) ) );
	amp.assign( pow( 0.5, float( int( 3 ).sub( int( 1 ) ) ) ) );
	t.addAssign( valueNoise_dRtETCExVWxq( v.div( freq ) ).mul( amp ) );
	freq.assign( pow( 2.0, float( int( 2 ) ) ) );
	amp.assign( pow( 0.5, float( int( 3 ).sub( int( 2 ) ) ) ) );
	t.addAssign( valueNoise_dRtETCExVWxq( v.div( freq ) ).mul( amp ) );

	return t;

} ).setLayout( {
	name: 'SimpleNoise_dRtETCExVWxq',
	type: 'float',
	inputs: [
		{ name: 'v', type: 'vec2' }
	]
} );

/**
 * 一个生成简单噪声值的函数。
 *
 * @function simple
 * @param {vec2} uv - 输入的二维纹理坐标（不可变）。
 * @param {float} scale - 噪声缩放比例（不可变）。
 * @returns {float} 返回生成的噪声值。
*/
export const simple = /*#__PURE__*/ Fn( ( [ uv_immutable, scale_immutable ] ) => {

	const scale = float( scale_immutable ).toVar();
	const uv = vec2( uv_immutable ).toVar();
	const noise = float( SimpleNoise_dRtETCExVWxq( uv.mul( scale ) ) ).toVar();

	return noise;

} ).setLayout( {
	name: 'simple',
	type: 'float',
	inputs: [
		{ name: 'uv', type: 'vec2' },
		{ name: 'scale', type: 'float' }
	]
} );
