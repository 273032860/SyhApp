// Three.js Transpiler r171

import { vec2, dot, sin, fract, Fn, float, floor, int, mul, If, Loop } from 'three/tsl';

export const voronoihash_Z9NuDbXaGWZO = /*#__PURE__*/ Fn( ( [ p_immutable ] ) => {

	const p = vec2( p_immutable ).toVar();
	p.assign( vec2( dot( p, vec2( 127.1, 311.7 ) ), dot( p, vec2( 269.5, 183.3 ) ) ) );

	return fract( sin( p ).mul( 43758.5453 ) );

} ).setLayout( {
	name: 'voronoihash_Z9NuDbXaGWZO',
	type: 'vec2',
	inputs: [
		{ name: 'p', type: 'vec2' }
	]
} );

export const voronoi_Z9NuDbXaGWZO = /*#__PURE__*/ Fn( ( [ v_immutable, time_immutable  ] ) => {

	// const smoothness = float( smoothness_immutable ).toVar();
	const time = float( time_immutable ).toVar();
	const v = vec2( v_immutable ).toVar();
	const n = vec2( floor( v ) ).toVar();
	const f = vec2( fract( v ) ).toVar();
	const F1 = float( 8.0 ).toVar();
	const F2 = float( 8.0 ).toVar();
	const mg = vec2( 0.0, 0.0 ).toVar();

	Loop( { start: int( - 1 ), end: int( 1 ), name: 'j', condition: '<=' }, ( { j } ) => {

		Loop( { start: int( - 1 ), end: int( 1 ), condition: '<=' }, ( { i } ) => {

			const g = vec2( i, j ).toVar();
			const o = vec2( voronoihash_Z9NuDbXaGWZO( n.add( g ) ) ).toVar();
			o.assign( sin( time.add( o.mul( 6.2831 ) ) ).mul( 0.5 ).add( 0.5 ) );
			const r = vec2( f.sub( g ).sub( o ) ).toVar();
			const d = float( mul( 0.5, dot( r, r ) ) ).toVar();

			If( d.lessThan( F1 ), () => {

				F2.assign( F1 );
				F1.assign( d );
				mg.assign( g );
				// mr.assign( r );
				// id.assign( o );

			} ).ElseIf( d.lessThan( F2 ), () => {

				F2.assign( d );

			} );

		} );

	} );

	return F1;

} );

/**
 * 生成一个 Voronoi 图案，其中每个小区块的颜色由最近的点决定。该函数使用多次迭代，通过应用 Voronoi 算法生成平滑的结果。
 * 其中，`angle`、`scale` 和 `smoothness` 控制图案的形态和细节。
 *
 * @function
 * @name voronoi
 * @param {vec2} uv - 2D UV 坐标，表示在纹理上的位置。
 * @param {float} angle - 影响 Voronoi 图案的角度。
 * @param {float} scale - 缩放因子，用于调整图案的大小。
 * @param {float} smoothness - 控制 Voronoi 图案的平滑度。
 * @param {vec2} id - 用于标识 Voronoi 图案中每个小块的唯一标识符。
 * @param {vec2} uv1 - 可能用于额外的 UV 操作的参数（未在函数体内显式使用）。
 * @returns {float} - 返回最终计算的 Voronoi 图案值，通常用于决定颜色或其他纹理效果。
*/
export const voronoiNoise = /*#__PURE__*/ Fn( ( [ uv_immutable, angle_immutable, scale_immutable,pows=0.4 ] ) => {

	// const smoothness = float( smoothness_immutable ).toVar();
	const scale = float( scale_immutable ).toVar();
	const angle = float( angle_immutable ).toVar();
	const uv = vec2( uv_immutable ).toVar();
	const coords = vec2( uv.mul( scale ) ).toVar();
	// id.assign( vec2( 0.0, 0.0 ) );
	// uv1.assign( vec2( 0.0, 0.0 ) );
	const fade = float( 0.5 ).toVar();
	const voroi = float( 0.0 ).toVar();
	const rest = float( 0.0 ).toVar();

	Loop( { start: int( 0 ), end: int( 5 ), name: 'it' }, ( { it } ) => {

		voroi.addAssign( fade.mul( voronoi_Z9NuDbXaGWZO( coords, angle  ) ) );
		rest.addAssign( fade );
		// coords.mulAssign( smoothness );
		fade.mulAssign( 0.5 );

	} );

	voroi.divAssign( rest );

	return voroi.pow(pows) ;

} );
