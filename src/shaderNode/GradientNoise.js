// Three.js Transpiler r171

import { vec2, mul, fract, Fn, float, floor, sub, dot, mix, uv } from 'three/tsl';

export const GradientNoiseDir_dRtETCExVWxq = /*#__PURE__*/ Fn( ( [ x_immutable ] ) => {

	const x = vec2( x_immutable ).toVar();
	const k = vec2( 0.3183099, 0.3678794 );
	x.assign( x.mul( k ).add( k.yx ) );

	return float( - 1.0 ).add( mul( 2.0, fract( mul( 16.0, k ).mul( fract( x.x.mul( x.y ).mul( x.x.add( x.y ) ) ) ) ) ) );

} ).setLayout( {
	name: 'GradientNoiseDir_dRtETCExVWxq',
	type: 'vec2',
	inputs: [
		{ name: 'x', type: 'vec2' }
	]
} );

export const GradientNoise_dRtETCExVWxq = /*#__PURE__*/ Fn( ( [ v_immutable, Scale_immutable ] ) => {

	const Scale = float( Scale_immutable ).toVar();
	const v = vec2( v_immutable ).toVar();
	const p = vec2( v.mul( Scale ) ).toVar();
	const i = vec2( floor( p ) ).toVar();
	const f = vec2( fract( p ) ).toVar();
	const u = vec2( f.mul( f ).mul( sub( 3.0, mul( 2.0, f ) ) ) ).toVar();

	return mix( mix( dot( GradientNoiseDir_dRtETCExVWxq( i.add( vec2( 0.0, 0.0 ) ) ), f.sub( vec2( 0.0, 0.0 ) ) ), dot( GradientNoiseDir_dRtETCExVWxq( i.add( vec2( 1.0, 0.0 ) ) ), f.sub( vec2( 1.0, 0.0 ) ) ), u.x ), mix( dot( GradientNoiseDir_dRtETCExVWxq( i.add( vec2( 0.0, 1.0 ) ) ), f.sub( vec2( 0.0, 1.0 ) ) ), dot( GradientNoiseDir_dRtETCExVWxq( i.add( vec2( 1.0, 1.0 ) ) ), f.sub( vec2( 1.0, 1.0 ) ) ), u.x ), u.y );

} ).setLayout( {
	name: 'GradientNoise_dRtETCExVWxq',
	type: 'float',
	inputs: [
		{ name: 'v', type: 'vec2' },
		{ name: 'Scale', type: 'float' }
	]
} );

export const gradientNoise = /*#__PURE__*/ Fn( ( [ uv_immutable, scale_immutable ] ) => {

	const scale = float( scale_immutable ).toVar();
	const uv = vec2( uv_immutable ).toVar();
	const noise = float( GradientNoise_dRtETCExVWxq( uv, scale ) ).toVar();
	noise.assign( noise.mul( 0.5 ).add( 0.5 ) );

	return noise;

} ).setLayout( {
	name: 'gradientNoise',
	type: 'float',
	inputs: [
		{ name: 'uv', type: 'vec2' },
		{ name: 'scale', type: 'float' }
	]
} );