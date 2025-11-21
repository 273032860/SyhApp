// Three.js Transpiler r171
import { float, vec4,clamp, vec2, mix, Loop, Fn,rotateUV,uv } from 'three/tsl';
 
// 渐变节点
/**
 * 创建一个渐变节点，用于生成基于 UV 坐标的渐变颜色效果。
 * 
 * @param {Array} colorGradient - 一个数组，包含颜色渐变的关键点，每个关键点是一个包含以下属性的向量：
 *   - `.rgb` (vec3): 关键点的颜色值（RGB 格式）。
 *   - `.w` (float): 关键点的权重或位置。
 * @param {float} attractorsLength - 渐变的关键点数量，用于循环处理所有颜色关键点。
 * @param {float} time_p - 介于 0 和 1 之间的值，其中每个分数对应于色带上的一种颜色。尝试连接 UV 或 SinTime。仅当相应输入端口未连接时才可见。
 * @returns {vec4} 返回一个包含最终计算出的 RGBA 颜色值的向量。
 * https://app.nodetoy.co/learn/gradient
 * ### 内部逻辑
 * 1. **UV 坐标旋转**:
 *    - 使用 `rotateUV` 函数将 UV 坐标按指定的旋转角度 `rotate` 进行旋转。
 * 2. **颜色渐变计算**:
 *    - 遍历 `colorGradient` 中的所有颜色关键点，并计算每个关键点之间的权重位置，利用线性插值 (`mix`) 获取混合颜色。
 *    - 权重计算基于关键点在 UV 坐标空间中的相对位置。
 * 3. **颜色混合**:
 *    - 从第一个关键点开始，将所有混合后的颜色结果累加到最终的 `colors` 变量中。
 * 
 * ### 示例用法
 * ```javascript
* // 示例输入
* const colorGradient = [
*   vec4(1.0, 0.0, 0.0, 0.0), // 红色 (RGB) 在权重位置 0.0
*   vec4(0.0, 1.0, 0.0, 0.5), // 绿色 (RGB) 在权重位置 0.5
*   vec4(0.0, 0.0, 1.0, 1.0)  // 蓝色 (RGB) 在权重位置 1.0
* ];
* const attractorsLength = 3;
* 
* const gradient = gradientNode(colorGradient, attractorsLength, rotate);
* ```
*/
export const gradientNode = /*#__PURE__*/ Fn(([colorGradient,attractorsLength,time_p]) => {
    // 将时间参数转换为浮点数
    const timerotate = float(time_p).toVar();

    // 初始化颜色
    const color1 = colorGradient.element(0)
    const colors = color1.rgb.toVar()

    //旋转UV
    //rotateUV函数解释 rotateUV( uv, rotation, centerNode = vec2( 0.5 ) )
    const node1 = timerotate
    // const timenode = pUv 
    Loop( attractorsLength, ({ i }) => {
        const c1 = colorGradient.element(i)
        const c2 = colorGradient.element(i.add(1))
        const colorPoss = clamp(
            float(float(node1.x).sub(c1.w)).div(float(c2.w.sub(c1.w))), 
        0.0, 1.0);
        colors.assign(mix(colors,c2.rgb,colorPoss))
    });
    
  // 返回最终颜色值
    return vec4(colors, 1.0);
});