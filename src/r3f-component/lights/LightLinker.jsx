import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { lights } from "three/tsl";
import { Light } from "three/webgpu";

export default function LightNode({ model, lightNames = [] }) {
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    // ✅ 查找所有传入名字的灯光
    const lightObjects = lightNames
      .map((name) => scene.getObjectByName(name))
      .filter((obj) => obj && obj instanceof Light);

    console.log("找到灯光:", lightObjects);

    if (lightObjects.length === 0) {
      console.warn("⚠️ 没找到指定灯光:", lightNames);
      return;
    }

    const models = scene.getObjectByName(model);
    if (!models || !models.material) {
      console.warn("⚠️ 没找到模型或材质:", model);
      return;
    }

    const redLightsNode = lights([...lightObjects]); 
    models.material.lightsNode = redLightsNode;

  }, [scene, model, lightNames]);

  return null;
}