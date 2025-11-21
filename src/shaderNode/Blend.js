import { float, vec4, clamp, mul, sub, mix, Fn, max, temp, select, min, abs, round } from 'three/tsl';

export const blend_exclusion = /*#__PURE__*/ Fn( ( [ blendOpSrc_immutable, blendOpDest_immutable, opacity_immutable, opacityMask_immutable ] ) => {

	const opacityMask = float( opacityMask_immutable ).toVar();
	const opacity = float( opacity_immutable ).toVar();
	const blendOpDest = vec4( blendOpDest_immutable ).toVar();
	const blendOpSrc = vec4( blendOpSrc_immutable ).toVar();
	const alpha = float( clamp( opacity.mul( opacityMask ), 0.0, 1.0 ) ).toVar();
	const mixBlendMode = vec4( mix( blendOpDest, sub( 0.5, mul( 2.0, blendOpSrc.sub( 0.5 ) ).mul( blendOpDest.sub( 0.5 ) ) ), alpha ) ).toVar();

	return clamp( mixBlendMode, 0.0, 1.0 ).xyzw;

} ).setLayout( {
	name: 'blend_exclusion',
	type: 'vec4',
	inputs: [
		{ name: 'blendOpSrc', type: 'vec4' },
		{ name: 'blendOpDest', type: 'vec4' },
		{ name: 'opacity', type: 'float' },
		{ name: 'opacityMask', type: 'float' }
	]
} );

export const blend_ColorBurn = /*#__PURE__*/ Fn( ( [ blendOpSrc_immutable, blendOpDest_immutable, opacity_immutable, opacityMask_immutable ] ) => {

	const opacityMask = float( opacityMask_immutable ).toVar();
	const opacity = float( opacity_immutable ).toVar();
	const blendOpDest = vec4( blendOpDest_immutable ).toVar();
	const blendOpSrc = vec4( blendOpSrc_immutable ).toVar();
	const alpha = float( clamp( opacity.mul( opacityMask ), 0.0, 1.0 ) ).toVar();
	const mixBlendMode = vec4( mix( blendOpDest, sub( 1.0, sub( 1.0, blendOpDest ).div( max( blendOpSrc, 0.00001 ) ) ), alpha ) ).toVar();

	return clamp( mixBlendMode, 0.0, 1.0 ).xyzw;

} ).setLayout( {
	name: 'blend_ColorBurn',
	type: 'vec4',
	inputs: [
		{ name: 'blendOpSrc', type: 'vec4' },
		{ name: 'blendOpDest', type: 'vec4' },
		{ name: 'opacity', type: 'float' },
		{ name: 'opacityMask', type: 'float' }
	]
} );


export const blend_ColorDodge = /*#__PURE__*/ Fn( ( [ blendOpSrc_immutable, blendOpDest_immutable, opacity_immutable, opacityMask_immutable ] ) => {

	const opacityMask = float( opacityMask_immutable ).toVar();
	const opacity = float( opacity_immutable ).toVar();
	const blendOpDest = vec4( blendOpDest_immutable ).toVar();
	const blendOpSrc = vec4( blendOpSrc_immutable ).toVar();
	const alpha = float( clamp( opacity.mul( opacityMask ), 0.0, 1.0 ) ).toVar();
	const mixBlendMode = vec4( mix( blendOpDest, blendOpDest.div( max( sub( 1.0, blendOpSrc ), 0.00001 ) ), alpha ) ).toVar();

	return clamp( mixBlendMode, 0.0, 1.0 ).xyzw;

} ).setLayout( {
	name: 'blend_ColorDodge',
	type: 'vec4',
	inputs: [
		{ name: 'blendOpSrc', type: 'vec4' },
		{ name: 'blendOpDest', type: 'vec4' },
		{ name: 'opacity', type: 'float' },
		{ name: 'opacityMask', type: 'float' }
	]
} );

export const blend_Copy = /*#__PURE__*/ Fn( ( [ blendOpSrc_immutable, blendOpDest_immutable, opacity_immutable, opacityMask_immutable ] ) => {

	const opacityMask = float( opacityMask_immutable ).toVar();
	const opacity = float( opacity_immutable ).toVar();
	const blendOpDest = vec4( blendOpDest_immutable ).toVar();
	const blendOpSrc = vec4( blendOpSrc_immutable ).toVar();
	const alpha = float( clamp( opacity.mul( opacityMask ), 0.0, 1.0 ) ).toVar();
	const temp = vec4().toVar();
	temp.x.assign( blendOpSrc.x.mul( alpha ).add( blendOpDest.x.mul( sub( 1.0, alpha ) ) ) );
	temp.y.assign( blendOpSrc.y.mul( alpha ).add( blendOpDest.y.mul( sub( 1.0, alpha ) ) ) );
	temp.z.assign( blendOpSrc.z.mul( alpha ).add( blendOpDest.z.mul( sub( 1.0, alpha ) ) ) );
	temp.w.assign( blendOpSrc.w.mul( alpha ).add( blendOpDest.w.mul( sub( 1.0, alpha ) ) ) );
	const mixBlendMode = vec4( temp ).toVar();

	return clamp( mixBlendMode, 0.0, 1.0 ).xyzw;

} ).setLayout( {
	name: 'blend_Copy',
	type: 'vec4',
	inputs: [
		{ name: 'blendOpSrc', type: 'vec4' },
		{ name: 'blendOpDest', type: 'vec4' },
		{ name: 'opacity', type: 'float' },
		{ name: 'opacityMask', type: 'float' }
	]
} );

export const blend_AddSub = /*#__PURE__*/ Fn( ( [ blendOpSrc_immutable, blendOpDest_immutable, opacity_immutable, opacityMask_immutable ] ) => {

	const opacityMask = float( opacityMask_immutable ).toVar();
	const opacity = float( opacity_immutable ).toVar();
	const blendOpDest = vec4( blendOpDest_immutable ).toVar();
	const blendOpSrc = vec4( blendOpSrc_immutable ).toVar();
	const alpha = float( clamp( opacity.mul( opacityMask ), 0.0, 1.0 ) ).toVar();
	const temp = vec4().toVar();
	temp.x.assign( select( blendOpSrc.x.greaterThanEqual( 0.5 ), blendOpSrc.x.add( blendOpDest.x ), blendOpSrc.x.sub( blendOpDest.x ) ) );
	temp.y.assign( select( blendOpSrc.y.greaterThanEqual( 0.5 ), blendOpSrc.y.add( blendOpDest.y ), blendOpSrc.y.sub( blendOpDest.y ) ) );
	temp.z.assign( select( blendOpSrc.z.greaterThanEqual( 0.5 ), blendOpSrc.z.add( blendOpDest.z ), blendOpSrc.z.sub( blendOpDest.z ) ) );
	temp.w.assign( select( blendOpSrc.w.greaterThan( 0.5 ), blendOpSrc.w.add( blendOpDest.w ), blendOpSrc.w.sub( blendOpDest.w ) ) );
	const mixBlendMode = vec4( mix( blendOpDest, temp, alpha ) ).toVar();

	return clamp( mixBlendMode, 0.0, 1.0 ).xyzw;

} ).setLayout( {
	name: 'blend_AddSub',
	type: 'vec4',
	inputs: [
		{ name: 'blendOpSrc', type: 'vec4' },
		{ name: 'blendOpDest', type: 'vec4' },
		{ name: 'opacity', type: 'float' },
		{ name: 'opacityMask', type: 'float' }
	]
} );

export const blend_Switch = /*#__PURE__*/ Fn( ( [ blendOpSrc_immutable, blendOpDest_immutable, opacity_immutable, opacityMask_immutable ] ) => {

	const opacityMask = float( opacityMask_immutable ).toVar();
	const opacity = float( opacity_immutable ).toVar();
	const blendOpDest = vec4( blendOpDest_immutable ).toVar();
	const blendOpSrc = vec4( blendOpSrc_immutable ).toVar();
	const alpha = float( clamp( opacity.mul( opacityMask ), 0.0, 1.0 ) ).toVar();
	const mixBlendMode = vec4( mix( blendOpSrc, blendOpDest, alpha ) ).toVar();

	return clamp( mixBlendMode, 0.0, 1.0 ).xyzw;

} ).setLayout( {
	name: 'blend_Switch',
	type: 'vec4',
	inputs: [
		{ name: 'blendOpSrc', type: 'vec4' },
		{ name: 'blendOpDest', type: 'vec4' },
		{ name: 'opacity', type: 'float' },
		{ name: 'opacityMask', type: 'float' }
	]
} );

export const blend_Max_Darken = /*#__PURE__*/ Fn( ( [ blendOpSrc_immutable, blendOpDest_immutable, opacity_immutable, opacityMask_immutable ] ) => {

	const opacityMask = float( opacityMask_immutable ).toVar();
	const opacity = float( opacity_immutable ).toVar();
	const blendOpDest = vec4( blendOpDest_immutable ).toVar();
	const blendOpSrc = vec4( blendOpSrc_immutable ).toVar();
	const alpha = float( clamp( opacity.mul( opacityMask ), 0.0, 1.0 ) ).toVar();
	const mixBlendMode = vec4( mix( blendOpDest, min( blendOpSrc, blendOpDest ), alpha ) ).toVar();

	return clamp( mixBlendMode, 0.0, 1.0 ).xyzw;

} ).setLayout( {
	name: 'blend_Max_Darken',
	type: 'vec4',
	inputs: [
		{ name: 'blendOpSrc', type: 'vec4' },
		{ name: 'blendOpDest', type: 'vec4' },
		{ name: 'opacity', type: 'float' },
		{ name: 'opacityMask', type: 'float' }
	]
} );

export const blend_Divide = /*#__PURE__*/ Fn( ( [ blendOpSrc_immutable, blendOpDest_immutable, opacity_immutable, opacityMask_immutable ] ) => {

	const opacityMask = float( opacityMask_immutable ).toVar();
	const opacity = float( opacity_immutable ).toVar();
	const blendOpDest = vec4( blendOpDest_immutable ).toVar();
	const blendOpSrc = vec4( blendOpSrc_immutable ).toVar();
	const alpha = float( clamp( opacity.mul( opacityMask ), 0.0, 1.0 ) ).toVar();
	const mixBlendMode = vec4( mix( blendOpDest, blendOpDest.div( max( blendOpSrc, 0.00001 ) ), alpha ) ).toVar();

	return clamp( mixBlendMode, 0.0, 1.0 ).xyzw;

} ).setLayout( {
	name: 'blend_Divide',
	type: 'vec4',
	inputs: [
		{ name: 'blendOpSrc', type: 'vec4' },
		{ name: 'blendOpDest', type: 'vec4' },
		{ name: 'opacity', type: 'float' },
		{ name: 'opacityMask', type: 'float' }
	]
} );

export const blend_Difference = /*#__PURE__*/ Fn( ( [ blendOpSrc_immutable, blendOpDest_immutable, opacity_immutable, opacityMask_immutable ] ) => {

	const opacityMask = float( opacityMask_immutable ).toVar();
	const opacity = float( opacity_immutable ).toVar();
	const blendOpDest = vec4( blendOpDest_immutable ).toVar();
	const blendOpSrc = vec4( blendOpSrc_immutable ).toVar();
	const alpha = float( clamp( opacity.mul( opacityMask ), 0.0, 1.0 ) ).toVar();
	const mixBlendMode = vec4( mix( blendOpDest, abs( blendOpSrc.sub( blendOpDest ) ), alpha ) ).toVar();

	return clamp( mixBlendMode, 0.0, 1.0 ).xyzw;

} ).setLayout( {
	name: 'blend_Difference',
	type: 'vec4',
	inputs: [
		{ name: 'blendOpSrc', type: 'vec4' },
		{ name: 'blendOpDest', type: 'vec4' },
		{ name: 'opacity', type: 'float' },
		{ name: 'opacityMask', type: 'float' }
	]
} );


export const blend_SoftLight = /*#__PURE__*/ Fn( ( [ blendOpSrc_immutable, blendOpDest_immutable, opacity_immutable, opacityMask_immutable ] ) => {

	const opacityMask = float( opacityMask_immutable ).toVar();
	const opacity = float( opacity_immutable ).toVar();
	const blendOpDest = vec4( blendOpDest_immutable ).toVar();
	const blendOpSrc = vec4( blendOpSrc_immutable ).toVar();
	const alpha = float( clamp( opacity.mul( opacityMask ), 0.0, 1.0 ) ).toVar();
	const mixBlendMode = vec4( mix( blendOpDest, mul( 2.0, blendOpDest ).mul( blendOpSrc ).add( blendOpDest.mul( blendOpDest ).mul( sub( 1.0, mul( 2.0, blendOpSrc ) ) ) ), alpha ) ).toVar();

	return clamp( mixBlendMode, 0.0, 1.0 ).xyzw;

} ).setLayout( {
	name: 'blend_SoftLight',
	type: 'vec4',
	inputs: [
		{ name: 'blendOpSrc', type: 'vec4' },
		{ name: 'blendOpDest', type: 'vec4' },
		{ name: 'opacity', type: 'float' },
		{ name: 'opacityMask', type: 'float' }
	]
} );

export const blend_HardLight = /*#__PURE__*/ Fn( ( [ blendOpSrc_immutable, blendOpDest_immutable, opacity_immutable, opacityMask_immutable ] ) => {

	const opacityMask = float( opacityMask_immutable ).toVar();
	const opacity = float( opacity_immutable ).toVar();
	const blendOpDest = vec4( blendOpDest_immutable ).toVar();
	const blendOpSrc = vec4( blendOpSrc_immutable ).toVar();
	const alpha = float( clamp( opacity.mul( opacityMask ), 0.0, 1.0 ) ).toVar();
	const temp = vec4().toVar();
	temp.x.assign( select( blendOpSrc.x.greaterThan( 0.5 ), sub( 1.0, sub( 1.0, blendOpDest.x ).mul( sub( 1.0, mul( 2.0, blendOpSrc.x.sub( 0.5 ) ) ) ) ), blendOpDest.x.mul( mul( 2.0, blendOpSrc.x ) ) ) );
	temp.y.assign( select( blendOpSrc.y.greaterThan( 0.5 ), sub( 1.0, sub( 1.0, blendOpDest.y ).mul( sub( 1.0, mul( 2.0, blendOpSrc.y.sub( 0.5 ) ) ) ) ), blendOpDest.y.mul( mul( 2.0, blendOpSrc.y ) ) ) );
	temp.z.assign( select( blendOpSrc.z.greaterThan( 0.5 ), sub( 1.0, sub( 1.0, blendOpDest.z ).mul( sub( 1.0, mul( 2.0, blendOpSrc.z.sub( 0.5 ) ) ) ) ), blendOpDest.z.mul( mul( 2.0, blendOpSrc.z ) ) ) );
	temp.w.assign( select( blendOpSrc.w.greaterThan( 0.5 ), sub( 1.0, sub( 1.0, blendOpDest.w ).mul( sub( 1.0, mul( 2.0, blendOpSrc.w.sub( 0.5 ) ) ) ) ), blendOpDest.w.mul( mul( 2.0, blendOpSrc.w ) ) ) );
	const mixBlendMode = vec4( mix( blendOpDest, temp, alpha ) ).toVar();

	return clamp( mixBlendMode, 0.0, 1.0 ).xyzw;

} ).setLayout( {
	name: 'blend_HardLight',
	type: 'vec4',
	inputs: [
		{ name: 'blendOpSrc', type: 'vec4' },
		{ name: 'blendOpDest', type: 'vec4' },
		{ name: 'opacity', type: 'float' },
		{ name: 'opacityMask', type: 'float' }
	]
} );

export const blend_HardMix = /*#__PURE__*/ Fn( ( [ blendOpSrc_immutable, blendOpDest_immutable, opacity_immutable, opacityMask_immutable ] ) => {

	const opacityMask = float( opacityMask_immutable ).toVar();
	const opacity = float( opacity_immutable ).toVar();
	const blendOpDest = vec4( blendOpDest_immutable ).toVar();
	const blendOpSrc = vec4( blendOpSrc_immutable ).toVar();
	const alpha = float( clamp( opacity.mul( opacityMask ), 0.0, 1.0 ) ).toVar();
	const mixBlendMode = vec4( mix( blendOpDest, round( mul( 0.5, blendOpSrc.add( blendOpDest ) ) ), alpha ) ).toVar();

	return clamp( mixBlendMode, 0.0, 1.0 ).xyzw;

} ).setLayout( {
	name: 'blend_HardMix',
	type: 'vec4',
	inputs: [
		{ name: 'blendOpSrc', type: 'vec4' },
		{ name: 'blendOpDest', type: 'vec4' },
		{ name: 'opacity', type: 'float' },
		{ name: 'opacityMask', type: 'float' }
	]
} );

export const blend_Min_Lighten = /*#__PURE__*/ Fn( ( [ blendOpSrc_immutable, blendOpDest_immutable, opacity_immutable, opacityMask_immutable ] ) => {

	const opacityMask = float( opacityMask_immutable ).toVar();
	const opacity = float( opacity_immutable ).toVar();
	const blendOpDest = vec4( blendOpDest_immutable ).toVar();
	const blendOpSrc = vec4( blendOpSrc_immutable ).toVar();
	const alpha = float( clamp( opacity.mul( opacityMask ), 0.0, 1.0 ) ).toVar();
	const mixBlendMode = vec4( mix( blendOpDest, max( blendOpSrc, blendOpDest ), alpha ) ).toVar();

	return clamp( mixBlendMode, 0.0, 1.0 ).xyzw;

} ).setLayout( {
	name: 'blend_Min_Lighten',
	type: 'vec4',
	inputs: [
		{ name: 'blendOpSrc', type: 'vec4' },
		{ name: 'blendOpDest', type: 'vec4' },
		{ name: 'opacity', type: 'float' },
		{ name: 'opacityMask', type: 'float' }
	]
} );

export const blend_LinearBurn = /*#__PURE__*/ Fn( ( [ blendOpSrc_immutable, blendOpDest_immutable, opacity_immutable, opacityMask_immutable ] ) => {

	const opacityMask = float( opacityMask_immutable ).toVar();
	const opacity = float( opacity_immutable ).toVar();
	const blendOpDest = vec4( blendOpDest_immutable ).toVar();
	const blendOpSrc = vec4( blendOpSrc_immutable ).toVar();
	const alpha = float( clamp( opacity.mul( opacityMask ), 0.0, 1.0 ) ).toVar();
	const mixBlendMode = vec4( mix( blendOpDest, blendOpSrc.add( blendOpDest.sub( 1.0 ) ), alpha ) ).toVar();

	return clamp( mixBlendMode, 0.0, 1.0 ).xyzw;

} ).setLayout( {
	name: 'blend_LinearBurn',
	type: 'vec4',
	inputs: [
		{ name: 'blendOpSrc', type: 'vec4' },
		{ name: 'blendOpDest', type: 'vec4' },
		{ name: 'opacity', type: 'float' },
		{ name: 'opacityMask', type: 'float' }
	]
} );

export const blend_Dodge = /*#__PURE__*/ Fn( ( [ blendOpSrc_immutable, blendOpDest_immutable, opacity_immutable, opacityMask_immutable ] ) => {

	const opacityMask = float( opacityMask_immutable ).toVar();
	const opacity = float( opacity_immutable ).toVar();
	const blendOpDest = vec4( blendOpDest_immutable ).toVar();
	const blendOpSrc = vec4( blendOpSrc_immutable ).toVar();
	const alpha = float( clamp( opacity.mul( opacityMask ), 0.0, 1.0 ) ).toVar();
	const mixBlendMode = vec4( mix( blendOpDest, blendOpSrc.add( blendOpDest ), alpha ) ).toVar();

	return clamp( mixBlendMode, 0.0, 1.0 ).xyzw;

} ).setLayout( {
	name: 'blend_Dodge',
	type: 'vec4',
	inputs: [
		{ name: 'blendOpSrc', type: 'vec4' },
		{ name: 'blendOpDest', type: 'vec4' },
		{ name: 'opacity', type: 'float' },
		{ name: 'opacityMask', type: 'float' }
	]
} );

export const blennd_Light = /*#__PURE__*/ Fn( ( [ blendOpSrc_immutable, blendOpDest_immutable, opacity_immutable, opacityMask_immutable ] ) => {

	const opacityMask = float( opacityMask_immutable ).toVar();
	const opacity = float( opacity_immutable ).toVar();
	const blendOpDest = vec4( blendOpDest_immutable ).toVar();
	const blendOpSrc = vec4( blendOpSrc_immutable ).toVar();
	const alpha = float( clamp( opacity.mul( opacityMask ), 0.0, 1.0 ) ).toVar();
	const temp = vec4().toVar();
	temp.x.assign( select( blendOpSrc.x.greaterThan( 0.5 ), blendOpDest.x.add( mul( 2.0, blendOpSrc.x.sub( 0.5 ) ) ), blendOpDest.x.add( mul( 2.0, blendOpSrc.x ).sub( 1.0 ) ) ) );
	temp.y.assign( select( blendOpSrc.y.greaterThan( 0.5 ), blendOpDest.y.add( mul( 2.0, blendOpSrc.y.sub( 0.5 ) ) ), blendOpDest.y.add( mul( 2.0, blendOpSrc.y ).sub( 1.0 ) ) ) );
	temp.z.assign( select( blendOpSrc.z.greaterThan( 0.5 ), blendOpDest.z.add( mul( 2.0, blendOpSrc.z.sub( 0.5 ) ) ), blendOpDest.z.add( mul( 2.0, blendOpSrc.z ).sub( 1.0 ) ) ) );
	temp.w.assign( select( blendOpSrc.w.greaterThan( 0.5 ), blendOpDest.w.add( mul( 2.0, blendOpSrc.w.sub( 0.5 ) ) ), blendOpDest.w.add( mul( 2.0, blendOpSrc.w ).sub( 1.0 ) ) ) );
	const mixBlendMode = vec4( mix( blendOpDest, temp, alpha ) ).toVar();

	return clamp( mixBlendMode, 0.0, 1.0 ).xyzw;

} ).setLayout( {
	name: 'blennd_Light',
	type: 'vec4',
	inputs: [
		{ name: 'blendOpSrc', type: 'vec4' },
		{ name: 'blendOpDest', type: 'vec4' },
		{ name: 'opacity', type: 'float' },
		{ name: 'opacityMask', type: 'float' }
	]
} );


export const blend_Mulitiply = /*#__PURE__*/ Fn( ( [ blendOpSrc_immutable, blendOpDest_immutable, opacity_immutable, opacityMask_immutable ] ) => {

	const opacityMask = float( opacityMask_immutable ).toVar();
	const opacity = float( opacity_immutable ).toVar();
	const blendOpDest = vec4( blendOpDest_immutable ).toVar();
	const blendOpSrc = vec4( blendOpSrc_immutable ).toVar();
	const alpha = float( clamp( opacity.mul( opacityMask ), 0.0, 1.0 ) ).toVar();
	const mixBlendMode = vec4( mix( blendOpDest, blendOpSrc.mul( blendOpDest ), alpha ) ).toVar();

	return clamp( mixBlendMode, 0.0, 1.0 ).xyzw;

} ).setLayout( {
	name: 'blend_Mulitiply',
	type: 'vec4',
	inputs: [
		{ name: 'blendOpSrc', type: 'vec4' },
		{ name: 'blendOpDest', type: 'vec4' },
		{ name: 'opacity', type: 'float' },
		{ name: 'opacityMask', type: 'float' }
	]
} );

export const blend_Overlay = /*#__PURE__*/ Fn( ( [ blendOpSrc_immutable, blendOpDest_immutable, opacity_immutable, opacityMask_immutable ] ) => {

	const opacityMask = float( opacityMask_immutable ).toVar();
	const opacity = float( opacity_immutable ).toVar();
	const blendOpDest = vec4( blendOpDest_immutable ).toVar();
	const blendOpSrc = vec4( blendOpSrc_immutable ).toVar();
	const alpha = float( clamp( opacity.mul( opacityMask ), 0.0, 1.0 ) ).toVar();
	const temp = vec4().toVar();
	temp.x.assign( select( blendOpDest.x.greaterThan( 0.5 ), sub( 1.0, sub( 1.0, mul( 2.0, blendOpDest.x.sub( 0.5 ) ) ).mul( sub( 1.0, blendOpSrc.x ) ) ), mul( 2.0, blendOpDest.x ).mul( blendOpSrc.x ) ) );
	temp.y.assign( select( blendOpDest.y.greaterThan( 0.5 ), sub( 1.0, sub( 1.0, mul( 2.0, blendOpDest.y.sub( 0.5 ) ) ).mul( sub( 1.0, blendOpSrc.y ) ) ), mul( 2.0, blendOpDest.y ).mul( blendOpSrc.y ) ) );
	temp.z.assign( select( blendOpDest.z.greaterThan( 0.5 ), sub( 1.0, sub( 1.0, mul( 2.0, blendOpDest.z.sub( 0.5 ) ) ).mul( sub( 1.0, blendOpSrc.z ) ) ), mul( 2.0, blendOpDest.z ).mul( blendOpSrc.z ) ) );
	temp.w.assign( select( blendOpDest.w.greaterThan( 0.5 ), sub( 1.0, sub( 1.0, mul( 2.0, blendOpDest.w.sub( 0.5 ) ) ).mul( sub( 1.0, blendOpSrc.w ) ) ), mul( 2.0, blendOpDest.w ).mul( blendOpSrc.w ) ) );
	const mixBlendMode = vec4( mix( blendOpDest, temp, alpha ) ).toVar();

	return clamp( mixBlendMode, 0.0, 1.0 ).xyzw;

} ).setLayout( {
	name: 'blend_Overlay',
	type: 'vec4',
	inputs: [
		{ name: 'blendOpSrc', type: 'vec4' },
		{ name: 'blendOpDest', type: 'vec4' },
		{ name: 'opacity', type: 'float' },
		{ name: 'opacityMask', type: 'float' }
	]
} );

export const blend_PinLight = /*#__PURE__*/ Fn( ( [ blendOpSrc_immutable, blendOpDest_immutable, opacity_immutable, opacityMask_immutable ] ) => {

	const opacityMask = float( opacityMask_immutable ).toVar();
	const opacity = float( opacity_immutable ).toVar();
	const blendOpDest = vec4( blendOpDest_immutable ).toVar();
	const blendOpSrc = vec4( blendOpSrc_immutable ).toVar();
	const alpha = float( clamp( opacity.mul( opacityMask ), 0.0, 1.0 ) ).toVar();
	const temp = vec4().toVar();
	temp.x.assign( select( blendOpSrc.x.greaterThan( 0.5 ), max( blendOpDest.x, mul( 2.0, blendOpSrc.x.sub( 0.5 ) ) ), min( blendOpDest.x, mul( 2.0, blendOpSrc.x ) ) ) );
	temp.y.assign( select( blendOpSrc.y.greaterThan( 0.5 ), max( blendOpDest.y, mul( 2.0, blendOpSrc.y.sub( 0.5 ) ) ), min( blendOpDest.y, mul( 2.0, blendOpSrc.y ) ) ) );
	temp.z.assign( select( blendOpSrc.z.greaterThan( 0.5 ), max( blendOpDest.z, mul( 2.0, blendOpSrc.z.sub( 0.5 ) ) ), min( blendOpDest.z, mul( 2.0, blendOpSrc.z ) ) ) );
	temp.w.assign( select( blendOpSrc.w.greaterThan( 0.5 ), max( blendOpDest.w, mul( 2.0, blendOpSrc.w.sub( 0.5 ) ) ), min( blendOpDest.w, mul( 2.0, blendOpSrc.w ) ) ) );
	const mixBlendMode = vec4( mix( blendOpDest, temp, alpha ) ).toVar();

	return clamp( mixBlendMode, 0.0, 1.0 ).xyzw;

} ).setLayout( {
	name: 'blend_PinLight',
	type: 'vec4',
	inputs: [
		{ name: 'blendOpSrc', type: 'vec4' },
		{ name: 'blendOpDest', type: 'vec4' },
		{ name: 'opacity', type: 'float' },
		{ name: 'opacityMask', type: 'float' }
	]
} );


export const blend_Subtract = /*#__PURE__*/ Fn( ( [ blendOpSrc_immutable, blendOpDest_immutable, opacity_immutable, opacityMask_immutable ] ) => {

	const opacityMask = float( opacityMask_immutable ).toVar();
	const opacity = float( opacity_immutable ).toVar();
	const blendOpDest = vec4( blendOpDest_immutable ).toVar();
	const blendOpSrc = vec4( blendOpSrc_immutable ).toVar();
	const alpha = float( clamp( opacity.mul( opacityMask ), 0.0, 1.0 ) ).toVar();
	const mixBlendMode = vec4( mix( blendOpDest, blendOpDest.sub( blendOpSrc ), alpha ) ).toVar();

	return clamp( mixBlendMode, 0.0, 1.0 ).xyzw;

} ).setLayout( {
	name: 'blend_Subtract',
	type: 'vec4',
	inputs: [
		{ name: 'blendOpSrc', type: 'vec4' },
		{ name: 'blendOpDest', type: 'vec4' },
		{ name: 'opacity', type: 'float' },
		{ name: 'opacityMask', type: 'float' }
	]
} );

export const blend_Screnn = /*#__PURE__*/ Fn( ( [ blendOpSrc_immutable, blendOpDest_immutable, opacity_immutable, opacityMask_immutable ] ) => {

	const opacityMask = float( opacityMask_immutable ).toVar();
	const opacity = float( opacity_immutable ).toVar();
	const blendOpDest = vec4( blendOpDest_immutable ).toVar();
	const blendOpSrc = vec4( blendOpSrc_immutable ).toVar();
	const alpha = float( clamp( opacity.mul( opacityMask ), 0.0, 1.0 ) ).toVar();
	const mixBlendMode = vec4( mix( blendOpDest, sub( 1.0, sub( 1.0, blendOpSrc ).mul( sub( 1.0, blendOpDest ) ) ), alpha ) ).toVar();

	return clamp( mixBlendMode, 0.0, 1.0 ).xyzw;

} ).setLayout( {
	name: 'blend_Screnn',
	type: 'vec4',
	inputs: [
		{ name: 'blendOpSrc', type: 'vec4' },
		{ name: 'blendOpDest', type: 'vec4' },
		{ name: 'opacity', type: 'float' },
		{ name: 'opacityMask', type: 'float' }
	]
} );

export const blend_VividLight = /*#__PURE__*/ Fn( ( [ blendOpSrc_immutable, blendOpDest_immutable, opacity_immutable, opacityMask_immutable ] ) => {

	const opacityMask = float( opacityMask_immutable ).toVar();
	const opacity = float( opacity_immutable ).toVar();
	const blendOpDest = vec4( blendOpDest_immutable ).toVar();
	const blendOpSrc = vec4( blendOpSrc_immutable ).toVar();
	const alpha = float( clamp( opacity.mul( opacityMask ), 0.0, 1.0 ) ).toVar();
	const temp = vec4().toVar();
	temp.x.assign( select( blendOpSrc.x.greaterThan( 0.5 ), sub( 1.0, sub( 1.0, blendOpDest.x ).div( mul( 2.0, blendOpSrc.x.sub( 0.5 ) ) ) ), blendOpDest.x.div( sub( 1.0, mul( 2.0, blendOpSrc.x ) ) ) ) );
	temp.y.assign( select( blendOpSrc.y.greaterThan( 0.5 ), sub( 1.0, sub( 1.0, blendOpDest.y ).div( mul( 2.0, blendOpSrc.y.sub( 0.5 ) ) ) ), blendOpDest.y.div( sub( 1.0, mul( 2.0, blendOpSrc.y ) ) ) ) );
	temp.z.assign( select( blendOpSrc.z.greaterThan( 0.5 ), sub( 1.0, sub( 1.0, blendOpDest.z ).div( mul( 2.0, blendOpSrc.z.sub( 0.5 ) ) ) ), blendOpDest.z.div( sub( 1.0, mul( 2.0, blendOpSrc.z ) ) ) ) );
	temp.w.assign( select( blendOpSrc.w.greaterThan( 0.5 ), sub( 1.0, sub( 1.0, blendOpDest.w ).div( mul( 2.0, blendOpSrc.w.sub( 0.5 ) ) ) ), blendOpDest.w.div( sub( 1.0, mul( 2.0, blendOpSrc.w ) ) ) ) );
	const mixBlendMode = vec4( mix( blendOpDest, temp, alpha ) ).toVar();

	return clamp( mixBlendMode, 0.0, 1.0 ).xyzw;

} ).setLayout( {
	name: 'blend_VividLight',
	type: 'vec4',
	inputs: [
		{ name: 'blendOpSrc', type: 'vec4' },
		{ name: 'blendOpDest', type: 'vec4' },
		{ name: 'opacity', type: 'float' },
		{ name: 'opacityMask', type: 'float' }
	]
} );