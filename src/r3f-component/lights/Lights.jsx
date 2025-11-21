import { useRef, useEffect } from 'react';
import { RectAreaLight } from 'three';
import { RectAreaLightHelper } from "three/examples/jsm/Addons.js"
import { useHelper } from "@react-three/drei"

const Lights = () => {
  const rectLight1 = useRef();
  // const rectLight2 = useRef();
  // const rectLight3 = useRef();

  const LAYER_VOLUMETRIC_LIGHTING = 10;

  useEffect(() => {
    if (rectLight1.current) rectLight1.current.layers.enable(LAYER_VOLUMETRIC_LIGHTING);
    // if (rectLight2.current) rectLight2.current.layers.enable(LAYER_VOLUMETRIC_LIGHTING);
    // if (rectLight3.current) rectLight3.current.layers.enable(LAYER_VOLUMETRIC_LIGHTING);
  }, []);

  useHelper(rectLight1.current, RectAreaLightHelper);

  return (
    <>
      <rectAreaLight ref={rectLight1} color={0xff0000} intensity={50} width={4} height={10} position={[0, 5, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      {/* <rectAreaLight ref={rectLight2} color={0x00ff00} intensity={5} width={4} height={10} position={[0, 5, 5]} />
      <rectAreaLight ref={rectLight3} color={0x0000ff} intensity={5} width={4} height={10} position={[5, 5, 5]} /> */}
    </>
  );
};

export default Lights;