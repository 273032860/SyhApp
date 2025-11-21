// Three.js Transpiler r171

import { vec3, normalize, Fn } from 'three/tsl';

export const BlendNormals_3rQIuR6x4oYj = /*#__PURE__*/ Fn( ( [ n1_immutable, n2_immutable ] ) => {

	const n2 = vec3( n2_immutable ).toVar();
	const n1 = vec3( n1_immutable ).toVar();

	return normalize( vec3( n1.xy.mul( n2.z ).add( n2.xy.mul( n1.z ) ), n1.z.mul( n2.z ) ) );

} ).setLayout( {
	name: 'BlendNormals_3rQIuR6x4oYj',
	type: 'vec3',
	inputs: [
		{ name: 'n1', type: 'vec3' },
		{ name: 'n2', type: 'vec3' }
	]
} );

export const blendNormals = /*#__PURE__*/ Fn( ( [ A_immutable, B_immutable ] ) => {

	const B = vec3( B_immutable ).toVar();
	const A = vec3( A_immutable ).toVar();

	return BlendNormals_3rQIuR6x4oYj( A, B );

} ).setLayout( {
	name: 'blendNormals',
	type: 'vec3',
	inputs: [
		{ name: 'A', type: 'vec3' },
		{ name: 'B', type: 'vec3' }
	]
} );
