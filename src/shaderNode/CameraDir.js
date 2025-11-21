// Three.js Transpiler r171

import { cameraPosition, Fn, positionWorld } from 'three/tsl';



export const cameraDirection = /*#__PURE__*/ Fn( () => {
    return cameraPosition.sub(positionWorld).normalize()
} )
 