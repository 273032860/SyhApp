
import { degrees, Fn, rotateUV, uv, vec2 } from 'three/tsl';
import { simple } from './Simple';


/**
 * 纹理包装函数，用于创建重复纹理效果
 * 源于 https://www.bilibili.com/video/BV1Ri4y1c7d1/?spm_id_from=333.337.search-card.all.click&vd_source=1a5bcf98208957fd911ecd95df790dff
 * @type {Function}
 * @param {number} repeat - 纹理重复次数
 * @param {number} [noiseMultiplier=2] - 噪声倍数，用于控制旋转变化程度
 * @returns {vec2} 返回经过变换后的UV坐标
 */
export const textureWrap = /*#__PURE__*/ Fn(([repeat, noiseMultiplier=2]) => {
    const baseUV = uv().mul(repeat) 
    const rotateCenter = baseUV.floor().add(vec2(0.5))
    const rotate = degrees(simple( baseUV.floor(),noiseMultiplier).mul(360))
    const rotatedUV = rotateUV(baseUV,rotate,rotateCenter)
    return rotatedUV
})