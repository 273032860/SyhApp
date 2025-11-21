// Three.js Transpiler r171

import { vec2, uv, dot, sin, fract, Fn, float, sub, If, floor, color, smoothstep, length, step } from 'three/tsl';

export const random_3dVLFwUrT0D4 = /*#__PURE__*/ Fn( ( [ uv_immutable ] ) => {

	const uv = vec2( uv_immutable ).toVar();

	return fract( sin( dot( uv.xy, vec2( 12.9898, 78.233 ) ) ).mul( 43758.5453123 ) );

} ).setLayout( {
	name: 'random_y03exOjuyh34',
	type: 'float',
	inputs: [
		{ name: 'uv', type: 'vec2' }
	]
} );

export const truchetPattern_3dVLFwUrT0D4 = /*#__PURE__*/ Fn( ( [ uv_immutable, index_immutable ] ) => {

	const index = float( index_immutable ).toVar();
	const uv = vec2( uv_immutable ).toVar();
	index.assign( fract( index.sub( 0.5 ).mul( 2.0 ) ) );

	If( index.greaterThan( 0.75 ), () => {

		uv.assign( vec2( 1.0 ).sub( uv ) );

	} ).ElseIf( index.greaterThan( 0.5 ), () => {

		uv.assign( vec2( sub( 1.0, uv.x ), uv.y ) );

	} ).ElseIf( index.greaterThan( 0.25 ), () => {

		uv.assign( sub( 1.0, vec2( sub( 1.0, uv.x ), uv.y ) ) );

	} );

	return uv;

} ).setLayout( {
	name: 'truchetPattern_y03exOjuyh34',
	type: 'vec2',
	inputs: [
		{ name: 'uv', type: 'vec2', qualifier: 'in' },
		{ name: 'index', type: 'float', qualifier: 'in' }
	]
} );

export const truchet_Maze = /*#__PURE__*/ Fn( ( [ scale_immutable, resolution_immutable, uv_immutable ] ) => {

	const uv = vec2( uv_immutable ).toVar();
	const resolution = float( resolution_immutable ).toVar();
	const scale = float( scale_immutable ).toVar();
	const uvs = vec2( uv.mul( resolution ) ).toVar();
	const ipos = vec2( floor( uvs ) ).toVar();
	const fpos = vec2( fract( uvs ) ).toVar();
	const tile = vec2( truchetPattern_3dVLFwUrT0D4( fpos, random_3dVLFwUrT0D4( ipos.mul( scale ) ) ) ).toVar();
	const color = float( 0.0 ).toVar();
	color.assign( smoothstep( tile.x.sub( 0.3 ), tile.x, tile.y ).sub( smoothstep( tile.x, tile.x.add( 0.3 ), tile.y ) ) );

	return color;

} ).setLayout( {
	name: 'truchet_Maze',
	type: 'float',
	inputs: [
		{ name: 'scale', type: 'float' },
		{ name: 'resolution', type: 'float' },
		{ name: 'uv', type: 'vec2' }
	]
} );
 