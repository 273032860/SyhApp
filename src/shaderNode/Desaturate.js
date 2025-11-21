import { Fn,mix,dot,float,vec3 } from 'three/tsl'


export const desaturate = /*#__PURE__*/ Fn( ( [ rgb,intensity_immutable ] ) => {
    const col = rgb
	const intensity = float( intensity_immutable ).toVar();

	const t = (mix( col.xyz, vec3(dot( col.xyz, vec3( 0.299, 0.587, 0.114 ))), intensity ));

	return t.rgb

} )