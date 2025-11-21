import { float, vec2, int, textureSize, vec4,uv, texture, Loop, Fn } from 'three/tsl';


export const blur1 = /*#__PURE__*/ Fn( ( [ inputTex_immutable,float01 ] ) => {
    
	const inputTex = inputTex_immutable
	const intensity = float( float01 ).toVar();

	const texCoord = uv()

	const offset = vec2( vec2( 1.0, 1.0 ).div( vec2( textureSize( inputTex, int( 0 ) ) ) ) ).toVar();
	const whalf = float( intensity.mul( 0.5 ) ).toVar();
	const result = vec4( int( 0 ) ).toVar();

	Loop( { start: whalf.negate(), end: whalf, name: 'j', type: 'float', condition: '<=' }, ( { j } ) => {

		result.addAssign( texture( inputTex, texCoord.add( j.mul( offset ) ) ) );

	} );

	return result.div( intensity.add( 1.0 ) );

} )
