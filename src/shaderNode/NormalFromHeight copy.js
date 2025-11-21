
import { float, dFdx, vec3, dFdy, cross, dot, select, abs, max, normalize, Fn, modelWorldMatrix, positionLocal,vec4,mat3,cameraViewMatrix,tangentLocal,normalLocal,modelNormalMatrix,bitangentLocal,normalView,normalWorld,positionWorldDirection} from 'three/tsl';


export const normalFromHeight = /*#__PURE__*/ Fn( ( [ height_immutable,intens ] ) => {

	const height = float( height_immutable ).toVar();
	const intensity = float( intens.mul( 0.1 ) ).toVar();
	const nodevar1 = tangentLocal.xyz.normalize()
	const nodevar6 = bitangentLocal.xyz.normalize()
	const nodevar7 = normalWorld.xyz.normalize()
	const TangentMatrix = mat3(nodevar1, nodevar6, nodevar7).toVar();
	const nodeVary0 = ( modelWorldMatrix.mul( vec4( positionLocal, 0.0 )).xyz );
	const worldDerivativeX = dFdx( nodeVary0 )
	const worldDerivativeY = dFdy( nodeVary0 )
	const crossX = cross( TangentMatrix[2].xyz, worldDerivativeX )
	const crossY = cross( worldDerivativeY, TangentMatrix[2].xyz )
	const d = dot( worldDerivativeX, crossY )
	const sgn = select( d.lessThan( 0.0 ), float( - 1. ), 1. )
	const surface = float( sgn.div( max( 0.00000000000001192093, abs( d ) ) ) ).toVar();
	const dHdx = float( dFdx( height ) ).toVar();
	const dHdy = float( dFdy( height ) ).toVar();
	const surfGrad = vec3( surface.mul( dHdx.mul( crossY ).add( dHdy.mul( crossX ) ) ) ).toVar();
	const norm = vec3( normalize( TangentMatrix[2].xyz.sub( intensity.mul( surfGrad ) ) ) ).toVar();
	norm.assign( norm.mul( TangentMatrix ) );

	return norm.mul( 0.5 ).add( 0.5 );

} )
