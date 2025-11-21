import { Fn, vec2, vec3, vec4 } from 'three/tsl';

/**
 * Swizzle 节点 - 向量分量重排
 * @param {vec2|vec3|vec4} input - 输入向量
 * @param {string} mask - 重排遮罩，例如: 'xy', 'rgb', 'xyzw' 等
 * @returns {vec2|vec3|vec4} 重排后的向量
 */
export const swizzle = /*#__PURE__*/ Fn(([input, mask = 'xyzw']) => {
    // 根据遮罩长度确定返回向量类型
    switch (mask.length) {
        case 2:
            return vec2(input[mask[0]], input[mask[1]]);
        case 3:
            return vec3(input[mask[0]], input[mask[1]], input[mask[2]]);
        case 4:
            return vec4(input[mask[0]], input[mask[1]], input[mask[2]], input[mask[3]]);
        default:
            return input;
    }
}).setLayout({
    name: 'Swizzle',
    type: 'vec4',
    inputs: [
        { name: 'input', type: 'vec4', qualifier: 'in' },
        { name: 'mask', type: 'string', qualifier: 'in' }
    ]
});