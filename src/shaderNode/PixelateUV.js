// Three.js Transpiler r171

import { float, vec2, div, uv, int, Fn } from 'three/tsl';

export const pixelateUV = /*#__PURE__*/ Fn( ( [ uv_immutable, pixelsX_immutable, pixelsY_immutable ] ) => {

	const pixelsY = float( pixelsY_immutable ).toVar();
	const pixelsX = float( pixelsX_immutable ).toVar();
	const uv = vec2( uv_immutable ).toVar();
	const pixelWidth = float( div( 1.0, pixelsX ) ).toVar();
	const pixelHeight = float( div( 1.0, pixelsY ) ).toVar();
	const pixelateduv = vec2( float( int( uv.x.div( pixelWidth ) ) ).mul( pixelWidth ), float( int( uv.y.div( pixelHeight ) ) ).mul( pixelHeight ) ).toVar();

	return pixelateduv;

} ).setLayout( {
	name: 'pixelateUV',
	type: 'vec2',
	inputs: [
		{ name: 'uv', type: 'vec2' },
		{ name: 'pixelsX', type: 'float' },
		{ name: 'pixelsY', type: 'float' }
	]
} );
