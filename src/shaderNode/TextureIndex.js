import { div, float, Fn, mod, reciprocal, uv, vec2 } from "three/tsl"

/**
 * 根据索引获取纹理图集中指定格子的UV坐标
 * @param {number} index - 要获取的格子索引（从0开始，按从左到右、从上到下的顺序）
 * @param {number} rows - 纹理图集的总行数
 * @param {number} cols - 纹理图集的总列数
 * @returns {vec2} 返回计算后的UV坐标
 * @example
* // 对于3x3的纹理图集
* // 索引排列为：
* // 0 1 2
* // 3 4 5
* // 6 7 8
* const uv = textureIndex(4, 3, 3) // 获取中心位置的UV坐标
*/
export const textureIndex = Fn(([index, rows, cols]) => {
    // 计算行和列 (从0开始)
    const indexfloor = index.floor()
    const row = div(indexfloor, cols).floor()
    const col = mod(indexfloor, cols)
    
    // 计算单个格子的尺寸
    const cellWidth = float(1).div(cols)
    const cellHeight = float(1).div(rows)
    
    // 计算UV坐标
    const u = cellWidth.mul(col)
    const v = float(1).sub(cellHeight.mul(row.add(1)))
    const currentUV = uv().mul(vec2(reciprocal(rows), reciprocal(cols))).add(vec2(u, v))
    return currentUV
})
// export const textureIndex = Fn(([index, rows, cols]) => {
//     // 计算行和列 (从0开始)
//     const indexfloor = index.floor()
//     const row = div(indexfloor, cols).floor()
//     const col = mod(indexfloor, cols)
    
//     // 计算单个格子的尺寸
//     const cellWidth = float(1).div(cols)
//     const cellHeight = float(1).div(rows)
    
//     // 计算UV坐标
//     const u = cellWidth.mul(col)
//     const v = float(1).sub(cellHeight.mul(row.add(1)))
//     const currentUV = uv().mul(vec2(reciprocal(rows), reciprocal(cols))).add(vec2(u, v))
//     return currentUV
// })