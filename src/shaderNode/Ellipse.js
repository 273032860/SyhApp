import { vec2, length, sub, fwidth, clamp,Fn,float } from 'three/tsl';


export const ellipse = /*#__PURE__*/ Fn( ( [ uv_immutable,x_immutable, y_immutable ] ) => {
    const newuv = vec2( uv_immutable ).toVar();
    const width = float( x_immutable ).toVar();
    const height = float( y_immutable ).toVar();
    
   

    return clamp( sub( 1.0, length( newuv.mul( 2.0 ).sub( 1.0 ).div( vec2( width, height ) ) ) ).div( fwidth( length( newuv.mul( 2.0 ).sub( 1.0 ).div( vec2( width, height ) ) ) ) ), 0.0, 1.0 );


} )