import { Fn } from 'three/tsl';

export const triangleWave = /*#__PURE__*/ Fn( ( [ inV ] ) => {

	return   inV.sub(inV.add(0.5).floor()).mul(2).abs().mul(2).sub(1)

} )
