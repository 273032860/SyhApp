import { Fn,vec2 } from 'three/tsl'

/**
 * 使用网格 UV 并根据纹理填充和偏移参数对其进行操作，以定义纹理如何映射到 3D 资源上
 *
 * @function
 * @param {Object} inputs[0] - 平铺系数X。
 * @param {number} inputs[1] - 平铺系数Y。
 * @param {number} inputs[2] - 偏移X。
 * @param {number} inputs[3] - 偏移Y。
 * @returns {Object} 一个新uv，纹理填充和偏移。
*/
const coordinates = Fn( ( [ uv,tilingX, tilingY,offsetX, offsetY ] ) => {
    // return uv.mul(vec2( tilingX, tilingY )).add(vec2( offsetX , offsetY ));
    return vec2(
        uv.x.mul(tilingX).add(offsetX),
        uv.y.mul(tilingY).add(offsetY)
    )
} );

export default coordinates;