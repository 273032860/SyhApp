import { vec2, uv, distance, float, Fn, smoothstep } from 'three/tsl';



export const sdfCircle = /*#__PURE__*/ Fn( ( [ scale_immutable ] ) => {

	const strength = float( scale_immutable ).toVar();


    return smoothstep(0,1, distance(uv(), vec2(0.5)).add(strength)).oneMinus()

} )
