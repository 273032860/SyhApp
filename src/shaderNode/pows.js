// Three.js Transpiler r171

import { Fn, overloadingFn, float } from 'three/tsl';

export const pow2 = /*#__PURE__*/ Fn( ( [ x ] ) => {

	return x.mul( x );

} )

export const pow3 = /*#__PURE__*/ Fn( ( [ x ] ) => {

	return x.mul( x );

} )

 
export const pow4 = /*#__PURE__*/ Fn( ( [ x ] ) => {

	const x2 = float( x.mul( x ) ).toVar();

	return x2.mul( x2 );

} )
