// Three.js Transpiler r171

import { float, vec2, uv, length, atan2, Fn,fract,time } from 'three/tsl';

export const polarCoordinatesA = /*#__PURE__*/ Fn( ( [speed=0] ) => {
	const timespeed = float( speed ).toVar();
	const centerUv = uv().sub(0.5).toVar();
    const theta = atan2(centerUv.y, centerUv.x )
    theta.divAssign(float(3.1415926)).toVar();
    const r = float(length(centerUv).mul(2.0).add(fract(time.mul(timespeed)))).toVar();
    const newUv = vec2(r,theta).toVar();

	return newUv;

} )
