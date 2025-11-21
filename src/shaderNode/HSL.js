// Three.js Transpiler r171

import { vec3, float, min, max, sub, If, add, Fn, mul, vec4, clamp, hue, saturation, mod } from 'three/tsl';

export const ToHSL_wmOVjzstF5VV = /*#__PURE__*/ Fn( ( [ c_immutable ] ) => {

	const c = vec3( c_immutable ).toVar();
	const r = float( c.r ).toVar();
	const g = float( c.g ).toVar();
	const b = float( c.b ).toVar();
	const mina = float( min( min( r, g ), b ) ).toVar();
	const maxa = float( max( max( r, g ), b ) ).toVar();
	const delta = float( maxa.sub( mina ) ).toVar();
	const h = float( 0.0 ).toVar();
	const s = float( 0.0 ).toVar();
	const l = float( maxa.add( mina ).mul( 0.5 ) ).toVar();

	If( delta.greaterThan( 0.0001 ), () => {

		If( l.lessThan( 0.5 ), () => {

			s.assign( delta.div( maxa.add( mina ) ) );

		} ).Else( () => {

			s.assign( delta.div( sub( 2.0, maxa ).sub( mina ) ) );

		} );

		If( r.equal( maxa ), () => {

			h.assign( g.sub( b ).div( delta ) );

		} ).ElseIf( g.equal( maxa ), () => {

			h.assign( add( 2.0, b.sub( r ).div( delta ) ) );

		} ).ElseIf( b.equal( maxa ), () => {

			h.assign( add( 4.0, r.sub( g ).div( delta ) ) );

		} );

	} );

	return vec3( h, s, l );

} ).setLayout( {
	name: 'ToHSL_wmOVjzstF5VV',
	type: 'vec3',
	inputs: [
		{ name: 'c', type: 'vec3' }
	]
} );

export const ColorCalc_wmOVjzstF5VV = /*#__PURE__*/ Fn( ( [ c_immutable, t1_immutable, t2_immutable ] ) => {

	const t2 = float( t2_immutable ).toVar();
	const t1 = float( t1_immutable ).toVar();
	const c = float( c_immutable ).toVar();

	If( c.lessThan( 0.0 ), () => {

		c.addAssign( 1.0 );

	} );

	If( c.greaterThan( 1.0 ), () => {

		c.subAssign( 1.0 );

	} );

	If( c.lessThan( 1.0 / 6.0 ), () => {

		return t1.add( t2.sub( t1 ).mul( 6.0 ).mul( c ) );

	} );

	If( c.lessThan( 0.5 ), () => {

		return t2;

	} );

	If( c.lessThan( 2.0 / 3.0 ), () => {

		return t1.add( t2.sub( t1 ).mul( sub( 2.0 / 3.0, c ) ).mul( 6.0 ) );

	} );

	return t1;

} ).setLayout( {
	name: 'ColorCalc_wmOVjzstF5VV',
	type: 'float',
	inputs: [
		{ name: 'c', type: 'float' },
		{ name: 't1', type: 'float' },
		{ name: 't2', type: 'float' }
	]
} );

export const FromHSL_wmOVjzstF5VV = /*#__PURE__*/ Fn( ( [ c_immutable ] ) => {

	const c = vec3( c_immutable ).toVar();
	const H = float( c.r ).toVar();
	const S = float( c.g ).toVar();
	const L = float( c.b ).toVar();
	const r = float().toVar();
	const g = float().toVar();
	const b = float().toVar();

	If( S.lessThanEqual( 0.0001 ), () => {

		r.assign( g.assign( b.assign( min( 1.0, max( 0.0, L ) ) ) ) );

	} ).Else( () => {

		const t1 = float().toVar(), t2 = float().toVar();
		const th = float( H.div( 6.0 ) ).toVar();

		If( L.lessThan( 0.5 ), () => {

			t2.assign( L.mul( add( 1.0, S ) ) );

		} ).Else( () => {

			t2.assign( L.add( S ).sub( L.mul( S ) ) );

		} );

		t1.assign( mul( 2.0, L ).sub( t2 ) );
		const tr = float().toVar(), tg = float().toVar(), tb = float().toVar();
		tr.assign( th.add( 1.0 / 3.0 ) );
		tg.assign( th );
		tb.assign( th.sub( 1.0 / 3.0 ) );
		tr.assign( ColorCalc_wmOVjzstF5VV( tr, t1, t2 ) );
		tg.assign( ColorCalc_wmOVjzstF5VV( tg, t1, t2 ) );
		tb.assign( ColorCalc_wmOVjzstF5VV( tb, t1, t2 ) );
		r.assign( min( 1.0, max( 0.0, tr ) ) );
		g.assign( min( 1.0, max( 0.0, tg ) ) );
		b.assign( min( 1.0, max( 0.0, tb ) ) );

	} );

	return vec3( r, g, b );

} ).setLayout( {
	name: 'FromHSL_wmOVjzstF5VV',
	type: 'vec3',
	inputs: [
		{ name: 'c', type: 'vec3' }
	]
} );

export const HSL = /*#__PURE__*/ Fn( ( [ inputCol_immutable,h,s,l ] ) => {

	const inputCol = vec4( inputCol_immutable ).toVar();
	const hue = float( clamp( float( h ), 0.0, 1.0 ).sub( 0.5 ) ).toVar();
	const saturation = float( clamp( float( s ), 0.0, 1.0 ).sub( 0.5 ) ).toVar();
	const lightness = float( clamp( float( l ), 0.0, 1.0 ).sub( 0.5 ) ).toVar();
	const c = vec4( inputCol ).toVar();
	const hsl = vec3( ToHSL_wmOVjzstF5VV( c.rgb ) ).toVar();
	hsl.r.addAssign( hue );
	hsl.g.addAssign( saturation );
	hsl.b.addAssign( lightness );
	hsl.r.assign( mod( hsl.r, 6.0 ) );
	hsl.g.assign( min( 1.0, max( 0.0, hsl.g ) ) );
	hsl.b.assign( min( 1.0, max( 0.0, hsl.b ) ) );
	c.rgb.assign( FromHSL_wmOVjzstF5VV( hsl ) );

	return c;

} ).setLayout( {
	name: 'HSL',
	type: 'vec4',
	inputs: [
		{ name: 'inputCol', type: 'vec4' },
		{ name: 'h', type: 'float' },
		{ name: 's', type: 'float' },
		{ name: 'l', type: 'float' }
	]
} );
