// Three.js Transpiler r171

import { float, sin, fract, min, max, mix, Fn } from 'three/tsl';

export const noiseSineWave = /*#__PURE__*/ Fn( ( [ inVal_immutable, min_immutable, max_immutable ] ) => {

	const max = float( max_immutable ).toVar();
	const min = float( min_immutable ).toVar();
	const inVal = float( inVal_immutable ).toVar();
	const sinIn = float( sin( inVal ) ).toVar();
	const sinInOffset = float( sin( inVal.add( 1.0 ) ) ).toVar();
	const rd = float( fract( sin( sinIn.sub( sinInOffset ).mul( 12.9898 + 78.233 ) ).mul( 43758.5453 ) ) ).toVar();
	const noise = float( mix( min, max, rd ) ).toVar();

	return sinIn.add( noise );

} ).setLayout( {
	name: 'noiseSineWave',
	type: 'float',
	inputs: [
		{ name: 'inVal', type: 'float' },
		{ name: 'min', type: 'float' },
		{ name: 'max', type: 'float' }
	]
} );