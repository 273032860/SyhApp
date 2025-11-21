import { float, vec3, modelViewMatrix, Fn } from 'three/tsl';

/**
 * 基于顶点位置、深度范围和偏移量计算相机深度淡出值。
 * 
 * 该函数用于向场景添加深度效果,它计算表面深度与相机近平面之间的差异，并将结果映射到 [0,1] 的线性范围。然后，您可以使用“长度”和“偏移”参数微调输出，以达到所需的效果。https://app.nodetoy.co/learn/camera-depth-fade
 * 
 * @param {vec3} vertexPos_immutable - positionLocal
 * @param {float} length - 淡出范围，控制淡出效果过渡的速度。
 * @param {float} offset - 偏移量，用于调整深度淡出范围的起始点。
 * 
 * @returns {float} - 基于深度的归一化淡出因子，具体取决于顶点距离和输入参数。
 */
export const cameraDepthFade = /*#__PURE__*/ Fn( ( [ vertexPos_immutable, length, offset ] ) => {

    const vertexPos = vec3( vertexPos_immutable ).toVar();

    const eyeDepth =  modelViewMatrix.mul( vertexPos ).z.negate()
	const cameraDepthFade = float( eyeDepth.sub( 0.1 ).sub( offset ).div( length ) ).toVar()

	return cameraDepthFade;

} )