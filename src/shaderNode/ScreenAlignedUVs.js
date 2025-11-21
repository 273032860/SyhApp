import { Fn,vec2,vec3,screenCoordinate } from 'three/tsl'


const screenAlignedUVs = Fn( ([sizew,sizeh]) => {
    const fragCoord = vec3( screenCoordinate.x, screenCoordinate.y, screenCoordinate.z ).toVar();
    const node1 = fragCoord.div(vec3( sizew, sizeh, 1)).toVar();
    

    return vec2( node1.x, node1.y).toVar();
} );

export default screenAlignedUVs;