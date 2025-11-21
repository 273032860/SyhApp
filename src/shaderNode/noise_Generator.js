import { vec3, mod, Fn, vec2, vec4, dot, floor, select, sub, max, fract, mul, abs,float } from 'three/tsl';

export const permute = /*#__PURE__*/ Fn( ( [ x_immutable ] ) => {

	const x = vec3( x_immutable ).toVar();

	return mod( x.mul( 34.0 ).add( 1.0 ).mul( x ), 289.0 );

} ).setLayout( {
	name: 'permute',
	type: 'vec3',
	inputs: [
		{ name: 'x', type: 'vec3' }
	]
} );

export const snoise2D = /*#__PURE__*/ Fn( ( [ v_immutable ] ) => {

	const v = vec2( v_immutable ).toVar();
	const C = vec4( 0.211324865405187, 0.366025403784439, float( - 0.577350269189626 ), 0.024390243902439 );
	const i = vec2( floor( v.add( dot( v, C.yy ) ) ) ).toVar();
	const x0 = vec2( v.sub( i ).add( dot( i, C.xx ) ) ).toVar();
	const i1 = vec2().toVar();
	i1.assign( select( x0.x.greaterThan( x0.y ), vec2( 1.0, 0.0 ), vec2( 0.0, 1.0 ) ) );
	const x12 = vec4( x0.xyxy.add( C.xxzz ) ).toVar();
	x12.xy.subAssign( i1 );
	i.assign( mod( i, 289.0 ) );
	const p = vec3( permute( permute( i.y.add( vec3( 0.0, i1.y, 1.0 ) ) ).add( i.x ).add( vec3( 0.0, i1.x, 1.0 ) ) ) ).toVar();
	const m = vec3( max( sub( 0.5, vec3( dot( x0, x0 ), dot( x12.xy, x12.xy ), dot( x12.zw, x12.zw ) ) ), 0.0 ) ).toVar();
	m.assign( m.mul( m ) );
	m.assign( m.mul( m ) );
	const x = vec3( mul( 2.0, fract( p.mul( C.www ) ) ).sub( 1.0 ) ).toVar();
	const h = vec3( abs( x ).sub( 0.5 ) ).toVar();
	const ox = vec3( floor( x.add( 0.5 ) ) ).toVar();
	const a0 = vec3( x.sub( ox ) ).toVar();
	m.mulAssign( sub( 1.79284291400159, mul( 0.85373472095314, a0.mul( a0 ).add( h.mul( h ) ) ) ) );
	const g = vec3().toVar();
	g.x.assign( a0.x.mul( x0.x ).add( h.x.mul( x0.y ) ) );
	g.yz.assign( a0.yz.mul( x12.xz ).add( h.yz.mul( x12.yw ) ) );

	return mul( 130.0, dot( m, g ) );

} ).setLayout( {
	name: 'snoise2D',
	type: 'float',
	inputs: [
		{ name: 'v', type: 'vec2' }
	]
} );

/**
 * 一个生成基于UV坐标和缩放因子的snoise2D噪声值的函数。
 * 生成的噪声被归一化到 [0, 1] 范围。
 *
 * @function
 * @param {Object} inputs[0] - uv。
 * @param {number} inputs[1] - 缩放因子，用于控制噪声的频率。
 * @returns {number} 一个浮点值，表示生成的噪声，并归一化到 [0, 1] 范围。
 * @example
* // 示例用法：
* const uv = uv()
* const scale = 5.0;
* const noiseValue = noise_Generator(uv, scale);
*/
export const noise_Generator = /*#__PURE__*/ Fn( ( [ uv_immutable, scale_immutable ] ) => {

	const scale = float( scale_immutable ).toVar();
	const uv = vec2( uv_immutable ).toVar();
	const noise = float( snoise2D( uv.mul( scale ) ) ).toVar();
	noise.assign( noise.mul( 0.5 ).add( 0.5 ) );

	return noise;

} ).setLayout( {
	name: 'noise_Generator',
	type: 'float',
	inputs: [
		{ name: 'uv', type: 'vec2' },
		{ name: 'scale', type: 'float' }
	]
} );
