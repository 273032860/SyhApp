// Three.js Transpiler r171

import { color, cubeTexture, Fn, mix, normalWorld, vec3 } from 'three/tsl';
import { reflectance } from './Reflectance';

 
export const ambient_sqecular = Fn(([baseColor,metallic,ambient,ambientIntensity=1,hemisphereLight,hemigroundColor,aoIntensity,norWorld=normalWorld,cubetexture,roughness]) => {
    const node1 = norWorld.y
    const node2 = mix(color(hemigroundColor),color(hemisphereLight),node1.add(1).saturate())
    const bakeGi = mix(node2,color(ambient).mul(ambientIntensity),node1.saturate())
    const node3 = bakeGi.mul(aoIntensity)
    const ambientlight = node3.mul(mix(baseColor,vec3(0),metallic))//金属没有基础色
    const sqecularAmbient = cubeTexture(cubetexture,norWorld,mix(0,8,roughness)).mul(reflectance(baseColor,metallic,norWorld))
    
    return  ambientlight.add(sqecularAmbient)
})
 

export const ambient_sqecular_ssao = Fn(([baseColor,metallic,ambient,ambientIntensity=1,hemisphereLight,hemigroundColor,aoIntensity,ssao,norWorld=normalWorld,cubetexture,roughness]) => {
    const node1 = norWorld.y
    const node2 = mix(color(hemigroundColor),color(hemisphereLight),node1.add(1).saturate())
    const bakeGi = mix(node2,color(ambient).mul(ambientIntensity),node1.saturate())
    const node3 = bakeGi.mul(aoIntensity.min(ssao))
    const ambientlight = node3.mul(mix(baseColor,vec3(0),metallic))//金属没有基础色
    const sqecularAmbient = cubeTexture(cubetexture,norWorld,mix(0,8,roughness)).mul(reflectance(baseColor,metallic,norWorld))
    
    return  ambientlight.add(sqecularAmbient)
})