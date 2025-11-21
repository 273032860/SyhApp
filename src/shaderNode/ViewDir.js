import { normalize, Fn, cameraPosition, positionWorld } from 'three/tsl';

export const viewDir = /*#__PURE__*/ Fn( () => {

	return normalize(cameraPosition.sub(positionWorld));

} )
