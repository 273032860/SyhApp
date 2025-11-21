// Three.js Transpiler r175

import { float, bool, mat3, dFdx, vec3, dFdy, int, cross, dot, select, abs, max, normalize, sub, If, Fn, tangentLocal, normalView, normalLocal, positionWorld, positionLocal, tangentWorld, bitangentWorld, normalWorld, bitangentLocal } from 'three/tsl';

export const normalFromHeight = /*#__PURE__*/ Fn( ( [ height_immutable,intens ] ) => {

	const height = float( height_immutable ).toVar();
	const invertY = bool( false ).toVar();
	const intensity = float( intens.mul(0.1) ).toVar();
	const TangentMatrix = mat3( tangentLocal,bitangentLocal,normalLocal  ).toVar();
	const worldDerivativeX = vec3( dFdx( positionWorld ) ).toVar();
	const worldDerivativeY = vec3( dFdy( positionWorld ) ).toVar();
	const crossX = vec3( cross( TangentMatrix.element( int( 2 ) ).xyz, worldDerivativeX ) ).toVar();
	const crossY = vec3( cross( worldDerivativeY, TangentMatrix.element( int( 2 ) ).xyz ) ).toVar();
	const d = float( dot( worldDerivativeX, crossY ) ).toVar();
	const sgn = float( select( d.lessThan( 0.0 ), float( - 1. ), 1. ) ).toVar();
	const surface = float( sgn.div( max( 0.00000000000001192093, abs( d ) ) ) ).toVar();
	const dHdx = float( dFdx( height ) ).toVar();
	const dHdy = float( dFdy( height ) ).toVar();
	const surfGrad = vec3( surface.mul( dHdx.mul( crossY ).add( dHdy.mul( crossX ) ) ) ).toVar();
	const norm = vec3( normalize( TangentMatrix.element( int( 2 ) ).xyz.sub( intensity.mul( surfGrad ) ) ) ).toVar();
	norm.assign( norm.mul( TangentMatrix ) );

	If( invertY, () => {

		norm.g.assign( sub( 1.0, norm.g ) );

	} );

	return norm.mul( 0.5 ).add( 0.5 );

} )