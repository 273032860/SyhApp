import {  Fn, float } from 'three/tsl';

export const sawtoothWave = /*#__PURE__*/ Fn( ( [ inVal_immutable ] ) => {

	const inVal = float( inVal_immutable ).toVar();

	return inVal.sub(inVal.add(0.5).floor()).mul(2)

} ).setLayout( {
	name: 'sawtoothWave',
	type: 'float',
	inputs: [
		{ name: 'inVal', type: 'float' }
	]
} );
