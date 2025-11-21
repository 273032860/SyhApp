import { useEffect, useMemo, useRef, useState } from "react";
import { useHelper } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { button, useControls } from "leva";
import { IESLoader } from "three/examples/jsm/Addons.js";
import { IESSpotLight, SpotLightHelper } from "three/webgpu";

const Ies = ({
  levaname = 'ies聚光灯',
  settings = {},
  debug = false,
  iesPath,
  ...props
}) => {
  const [
    {
      color : colorL =  '#ffffff',
      position = [0, 0.7, 0],
      intensity = 1,
      target = [0, 0, 0],
      ishelper = true
    },
    setSettings
  ] = useState(settings);

  const ref = useRef();
  const iesTexture = useLoader(IESLoader, iesPath);

  // 创建灯光对象
  const spotLight = useMemo(() => {
    const light = new IESSpotLight(colorL, intensity);
    light.iesMap = iesTexture;
    return light;
  }, [iesTexture, colorL, intensity]);

  // 更新灯光属性
  useEffect(() => {
    if (ref.current) {
      ref.current.color.set(colorL);
      ref.current.intensity = intensity;
      ref.current.position.set(...position);
      ref.current.target.position.set(...target);
    }
  }, [colorL, intensity, position, target]);

  useHelper(ref, ishelper && SpotLightHelper);

  return (
    <>
      {debug && <IesBuilder levaname={levaname} settings={settings} onChange={setSettings} />}
      <primitive object={spotLight} ref={ref} {...props} />
    </>
  );
};

const IesBuilder = ({ levaname, settings, onChange }) => {
  const curControls = useRef({});
  const controls = useControls(levaname, {
    position: {
      value: settings.position || [0, 0.7, 0],
      step: 0.1
    },
    intensity: {
      value: settings.intensity || 1,
      min: 0,
      max: 50,
      step: 0.1
    },
    color: {
      value: settings.color || '#ffffff'
    },
    target: {
      value: settings.target || [0, 0, 0],
      step: 0.1
    },
    ishelper: {
      value: settings.ishelper !== undefined ? settings.ishelper : true,
      label: "helper"
    },
    "Export Settings": button(() => {
      const exportedSettings = {
        position: curControls.current.position,
        intensity: curControls.current.intensity,
        color: curControls.current.color,
        target: curControls.current.target,
        ishelper: curControls.current.ishelper
      };
      console.log(levaname, JSON.stringify(exportedSettings, null, 2));
      navigator.clipboard?.writeText(JSON.stringify(exportedSettings, null, 2));
    })
  });

  curControls.current = controls;

  useEffect(() => {
    onChange(controls);
  }, [controls, onChange]);

  return null;
};

export default Ies;