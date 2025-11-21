
import { uvec3, round, int, uvec2, uint, vec3, Fn } from 'three/tsl';

export const hash23 = /*#__PURE__*/ Fn( ([p]) => {

	const v = uvec3().toVar();
	v.xy.assign( uvec2( int( round( p.x ) ), int( round( p.y ) ) ) );
	v.y.bitXorAssign( uint( 1103515245 ) );
	v.x.addAssign( v.y );
	v.x.mulAssign( v.y );
	v.x.bitXorAssign( v.x.shiftRight( uint( 5 ) ) );
	v.x.mulAssign( int( 0x27d4eb2d ) );
	v.y.bitXorAssign( v.x.shiftLeft( uint( 3 ) ) );
	v.z.assign( v.x.bitXor( v.y.shiftLeft( uint( 5 ) ) ) );
	return vec3( v ).mul( 1.0 / 4294967295.0 ) ;

} )