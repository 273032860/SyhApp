// Three.js Transpiler r171

import { float, trunc, Fn, vec2, div, time, round, select, int, uv } from 'three/tsl';

export const fmod_VgPB18rMOSMy = /*#__PURE__*/ Fn( ( [ x_immutable, y_immutable ] ) => {

	const y = float( y_immutable ).toVar();
	const x = float( x_immutable ).toVar();

	return x.sub( y.mul( trunc( x.div( y ) ) ) );

} ).setLayout( {
	name: 'fmod_VgPB18rMOSMy',
	type: 'float',
	inputs: [
		{ name: 'x', type: 'float' },
		{ name: 'y', type: 'float' }
	]
} );

/**
 * 创建精灵图UV动画
 * @function flipbookUv
 * @param {vec2} uv_immutable - 原始UV坐标
 * @param {float} columns_immutable - 精灵图的列数
 * @param {float} rows_immutable - 精灵图的行数
 * @param {float} speed_immutable - 动画播放速度
 * @param {float} startFrame_immutable - 起始帧索引
 * @param {float} time_immutable - 当前时间
 * @returns {vec2} 计算后的UV坐标
 * @description
 * 将精灵图分割成网格并创建动画效果：
 * 1. 计算总帧数和每帧的偏移量
 * 2. 基于时间和速度计算当前帧索引
 * 3. 将帧索引转换为行列坐标
 * 4. 计算UV偏移并应用到原始UV上
 */
export const flipbookUv = /*#__PURE__*/ Fn( ( [ uv_immutable, columns_immutable, rows_immutable, speed_immutable, startFrame_immutable, time_immutable ] ) => {

	const time = float( time_immutable ).toVar();
	const startFrame = float( startFrame_immutable ).toVar();
	const speed = float( speed_immutable ).toVar();
	const rows = float( rows_immutable ).toVar();
	const columns = float( columns_immutable ).toVar();
	const uv = vec2( uv_immutable ).toVar();
	const fbtotaltiles = float( columns.mul( rows ) ).toVar();
	const fbcolsoffset = float( div( 1.0, columns ) ).toVar();
	const fbrowsoffset = float( div( 1.0, rows ) ).toVar();
	const fbspeed = float( time.mul( speed ) ).toVar();
	const fbtiling = vec2( fbcolsoffset, fbrowsoffset ).toVar();
	const fbcurrenttileindex = float( round( fmod_VgPB18rMOSMy( fbspeed.add( startFrame ), fbtotaltiles ) ) ).toVar();
	fbcurrenttileindex.addAssign( select( fbcurrenttileindex.lessThan( 0.0 ), fbtotaltiles, 0.0 ) );
	const fblinearindextox = float( round( fmod_VgPB18rMOSMy( fbcurrenttileindex, columns ) ) ).toVar();
	fblinearindextox.assign( select( speed.greaterThan( 0.0 ), fblinearindextox, float( int( columns ) ).sub( fblinearindextox ) ) );
	const fboffsetx = float( fblinearindextox.mul( fbcolsoffset ) ).toVar();
	const fblinearindextoy = float( round( fmod_VgPB18rMOSMy( fbcurrenttileindex.sub( fblinearindextox ).div( columns ), rows ) ) ).toVar();
	fblinearindextoy.assign( float( int( rows.sub( 1.0 ) ) ).sub( fblinearindextoy ) );
	const fboffsety = float( fblinearindextoy.mul( fbrowsoffset ) ).toVar();
	const fboffset = vec2( fboffsetx, fboffsety ).toVar();
	const fbuv = vec2( uv.mul( fbtiling ).add( fboffset ) ).toVar();

	return fbuv;

} ).setLayout( {
	name: 'flipbookUv',
	type: 'vec2',
	inputs: [
		{ name: 'uv', type: 'vec2' },
		{ name: 'columns', type: 'float' },
		{ name: 'rows', type: 'float' },
		{ name: 'speed', type: 'float' },
		{ name: 'startFrame', type: 'float' },
		{ name: 'time', type: 'float' }
	]
} );
