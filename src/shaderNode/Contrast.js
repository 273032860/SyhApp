// Three.js Transpiler r171

import { float,  Fn, EPSILON, vec4 } from 'three/tsl';


export const contrast = /*#__PURE__*/ Fn( ( [tex,sider] ) => {

	return tex.sub(float(0.5).pow(2.2)).mul(sider)

} )