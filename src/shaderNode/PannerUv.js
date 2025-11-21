import { Fn,vec2,time } from 'three/tsl'

/**
 * 一个工具函数，用于通过随时间变化修改UV坐标实现UV平移效果。
 *
 * @function
 * @param {Object} inputs[0] - UV坐标，表示为具有 `x` 和 `y` 分量的向量。
 * @param {number} inputs[1] - 沿X轴的平移速度。
 * @param {number} inputs[2] - 沿Y轴的平移速度。
 * @param {number} inputs[3] - time。默认为 `time`。
 * @returns {Object} 一个新uv，随时间平移x/y后的UV坐标。
*/
const pannerUv = Fn( ( [ uv, speedX, speedY ,time_prop = time ] ) => {
    return vec2(
        uv.x.add( time_prop.mul(speedX) ),
        uv.y.add( time_prop.mul(speedY) )
    );
} );

export default pannerUv;