import { useEffect, useRef, useState } from "react";
import { PointLightHelper } from "three/webgpu";
import { useHelper } from "@react-three/drei";
import { button, useControls } from "leva";

export function PointLight({
  volume = false,
  levaname = '点光',
  settings = {},
  debug = false,
  ...props
}) {
  const [
    {
      color : colorL =  '#ffffff',
      power = 10,
      distance = 0,
      decay = 2,
      position = [0, 2, 0],
      isHelper = true,
      helperSize = 0.5,
      castShadow = true,
      visible = true,
      shadowMapSize = 512,
      shadowRadius = 1.0,
      shadowBias = 0.0,
      shadowNormalBias = 0.02,
      shadowNear = 0.5,
      shadowFar = 500
    },
    setSettings
  ] = useState(settings);

  const lightRef = useRef();

  // 更新灯光属性
  useEffect(() => {
    if (lightRef.current) {
      lightRef.current.color.set(colorL);
      lightRef.current.power = power;   //power = intensity * 4 * Math.PI
      lightRef.current.intensity = power / (4 * Math.PI);
      lightRef.current.distance = distance;
      lightRef.current.decay = decay;
      lightRef.current.position.set(...position);
      lightRef.current.castShadow = castShadow;
      lightRef.current.visible = visible;
      volume && lightRef.current.layers.enable(10);
      
      // 更新阴影属性
      lightRef.current.shadow.mapSize.set(shadowMapSize, shadowMapSize);
      lightRef.current.shadow.radius = shadowRadius;
      lightRef.current.shadow.bias = shadowBias;
      lightRef.current.shadow.normalBias = shadowNormalBias;
      lightRef.current.shadow.camera.near = shadowNear;
      lightRef.current.shadow.camera.far = shadowFar;
    }
  }, [
    colorL, power, distance, decay, position,
    castShadow, visible,
    shadowMapSize, shadowRadius, shadowBias, shadowNormalBias, shadowNear, shadowFar,volume
  ]);

  useHelper(lightRef, isHelper && PointLightHelper, isHelper ? helperSize : 0);

  return (
    <>
      {debug && <PointLightBuilder levaname={levaname} settings={settings} onChange={setSettings} />}
      <pointLight
        name={levaname}
        ref={lightRef}
        castShadow={castShadow}
        shadow-needsUpdate={true}
        visible={visible}
        {...props}
      />
    </>
  );
}

const PointLightBuilder = ({ levaname, settings, onChange }) => {
  const curControls = useRef({});
  const controls = useControls(levaname, {
    castShadow: {
      value: settings.castShadow !== undefined ? settings.castShadow : true
    },
    color: {
      value: settings.color || '#ffffff'
    },
    power: {
      value: settings.power || 10,
      min: 0,
      max: 5000,
      step: 1
    },
    distance: {
      value: settings.distance || 0,
      min: 0,
      max: 50,
      step: 0.01,
      label: "距离"
    },
    decay: {
      value: settings.decay || 2,
      min: 0,
      max: 4,
      step: 0.01
    },
    position: {
      value: settings.position || [0, 2, 0],
      step: 0.1
    },
    isHelper: {
      value: settings.isHelper !== undefined ? settings.isHelper : true,
      label: "helper"
    },
    helperSize: {
      value: settings.helperSize || 0.5
    },
    shadowMapSize: {
      value: settings.shadowMapSize || 512,
      min: 256,
      max: 2048,
      step: 256
    },
    shadowRadius: {
      value: settings.shadowRadius || 1.0,
      min: 0,
      max: 20,
      step: 0.1,
      label: "阴影模糊半径"
    },
    shadowBias: {
      value: settings.shadowBias || 0.0,
      min: -0.02,
      max: 0.02,
      step: 0.0001,
      label: "阴影偏移 (bias)"
    },
    shadowNormalBias: {
      value: settings.shadowNormalBias || 0.02,
      min: 0.0,
      max: 1.0,
      step: 0.001,
      label: "法线normalBias"
    },
    shadowNear: {
      value: settings.shadowNear || 0.5,
      min: 0.01,
      max: 10,
      step: 0.01,
      label: "阴影near"
    },
    shadowFar: {
      value: settings.shadowFar || 500,
      min: 1,
      max: 200,
      step: 1,
      label: "阴影far"
    },
    visible: {
      value: settings.visible !== undefined ? settings.visible : true
    },
    "Export Settings": button(() => {
      const exportedSettings = {
        castShadow: curControls.current.castShadow,
        color: curControls.current.color,
        power: curControls.current.power,
        distance: curControls.current.distance,
        decay: curControls.current.decay,
        position: curControls.current.position,
        isHelper: curControls.current.isHelper,
        helperSize: curControls.current.helperSize,
        shadowMapSize: curControls.current.shadowMapSize,
        shadowRadius: curControls.current.shadowRadius,
        shadowBias: curControls.current.shadowBias,
        shadowNormalBias: curControls.current.shadowNormalBias,
        shadowNear: curControls.current.shadowNear,
        shadowFar: curControls.current.shadowFar,
        visible: curControls.current.visible
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