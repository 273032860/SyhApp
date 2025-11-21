import { Fn  } from 'three/tsl';

/**
 * 色阶化/色调分离函数 - 将连续的颜色值量化为离散的色阶
 * 这个函数实现了类似Photoshop中的色调分离效果，将图像颜色分成有限的几个色阶
 * 
 * @param {Vector3|float} input - 输入的颜色值或单通道值，范围通常为0-1
 * @param {float} pows - 色阶数量，值越大，分离的色阶越多，效果越不明显
 * @returns {Vector3|float} 返回量化后的颜色值，保持与输入相同的维度
 */
export const posterize = /*#__PURE__*/ Fn(([input,pows=4]) => {
    const node1 =  pows.reciprocal()
    const node2 =  input.div(node1).floor().mul(node1)
    return node2
})

 