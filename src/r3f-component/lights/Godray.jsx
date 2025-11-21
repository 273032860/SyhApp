import { button, useControls } from "leva";
import { useRef } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  cameraPosition,
  color,
  dot,
  mx_worley_noise_float,
  normalLocal,
  normalWorld,
  positionWorld,
  smoothstep,
  time,
  uniform,
  uv,
  vec4,
} from "three/tsl";


export const Godray = ({levaname='Godray',settings = {}, debug = false, ...props }) => {
  const [
    {
      position = [0, 0, 0],
      rotation = [0, 0, 0],
      color: godrayColor = "white",
      timeSpeed = 0.1,
      noiseScale = 5,
      topRadius = 3,
      bottomRadius = 2,
      height = 10,
      smoothBottom = 0.1,
      smoothTop = 0.9,
      fresnelPower = 5,
    },
    setSettings,
  ] = useState(settings);


  // Shader
  const { nodes, uniforms } = useMemo(() => {
    const uniforms = {
      noiseScale: uniform(noiseScale),
      color: uniform(color(godrayColor)),
      timeSpeed: uniform(timeSpeed),
      smoothTop: uniform(smoothTop),
      smoothBottom: uniform(smoothBottom),
      fresnelPower: uniform(fresnelPower),
    };
    const customUV = normalLocal
      .mul(uniforms.noiseScale)
      .add(time.mul(uniforms.timeSpeed));
    const noise = mx_worley_noise_float(customUV);
    const smooth = smoothstep(0, uniforms.smoothBottom, uv().y).mul(
      smoothstep(1.001, uniforms.smoothTop, uv().y)
    );

    const viewDirection = cameraPosition.sub(positionWorld).normalize();
    const invertedFresnel = dot(normalWorld, viewDirection)
      .abs()
      .pow(uniforms.fresnelPower);

    const alpha = (noise.mul(invertedFresnel).mul(smooth));

    return {
      nodes: {
        colorNode: vec4(0,0,0, alpha),
        emissiveNode: uniforms.color,
      },
      uniforms,
    };
  }, []);

  // Update uniforms
  useEffect(() => {
    uniforms.noiseScale.value = noiseScale;
    uniforms.timeSpeed.value = timeSpeed;
    uniforms.smoothTop.value = smoothTop;
    uniforms.smoothBottom.value = smoothBottom;
    uniforms.fresnelPower.value = fresnelPower;
    if (godrayColor) {
      uniforms.color.value.set(godrayColor);
    }
  }, [
    noiseScale,
    godrayColor,
    timeSpeed,
    smoothTop,
    smoothBottom,
    fresnelPower,
  ]);

  return (
    <>
      {debug && <GodrayBuilder levaname={levaname} settings={settings} onChange={setSettings} />}
      <mesh {...props} position={position} rotation={rotation}>
        <cylinderGeometry
          args={[topRadius, bottomRadius, height, 64, 1, true]}
        />
        <meshStandardNodeMaterial {...nodes} transparent />
      </mesh>
    </>
  );
};

const GodrayBuilder = ({levaname, settings, onChange }) => {
  const curControls = useRef({});
  const controls = useControls(levaname, {
    position: {
      value: settings.position || [0, 0, 0],
      step: 0.1,
    },
    rotation: {
      value: settings.rotation || [0, 0, 0],
      step: 0.01,
    },
    color: {
      value: settings.color || "white",
    },
    topRadius: {
      value: settings.topRadius || 3,
      min: 0.1,
      max: 10,
      step: 0.1,
    },
    bottomRadius: {
      value: settings.bottomRadius || 2,
      min: 0.1,
      max: 10,
      step: 0.1,
    },
    height: {
      value: settings.height || 10,
      min: 0.1,
      max: 20,
      step: 0.1,
    },
    timeSpeed: {
      value: settings.timeSpeed || 0.1,
      min: 0,
      max: 2,
      step: 0.01,
    },
    noiseScale: {
      value: settings.noiseScale || 5,
      min: 0.1,
      max: 20,
      step: 0.1,
    },
    smoothBottom: {
      value: settings.smoothBottom || 0.1,
      min: 0,
      max: 1,
      step: 0.001,
    },
    smoothTop: {
      value: settings.smoothTop || 0.9,
      min: 0,
      max: 1,
      step: 0.001,
    },
    fresnelPower: {
      value: settings.fresnelPower || 5,
      min: 1,
      max: 10,
      step: 0.1,
    },
    "Export Settings": button(() => {
      const exportedSettings = {
        position: curControls.current.position,
        rotation: curControls.current.rotation,
        color: curControls.current.color,
        topRadius: curControls.current.topRadius,
        bottomRadius: curControls.current.bottomRadius,
        height: curControls.current.height,
        timeSpeed: curControls.current.timeSpeed,
        noiseScale: curControls.current.noiseScale,
        smoothBottom: curControls.current.smoothBottom,
        smoothTop: curControls.current.smoothTop,
        fresnelPower: curControls.current.fresnelPower,
      };
      console.log(
        levaname,
        JSON.stringify(exportedSettings, null, 2)
      );
      navigator.clipboard?.writeText(JSON.stringify(exportedSettings, null, 2));
    }),
  });
  curControls.current = controls;

  useEffect(() => {
    onChange(controls);
  }, [controls, onChange]);

  return null;
};