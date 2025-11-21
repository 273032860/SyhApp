import { useHelper } from "@react-three/drei"
import { button, useControls } from "leva"
import { useEffect, useMemo, useRef, useState } from "react"
import { RectAreaLightHelper } from "three/examples/jsm/Addons.js"
import { RectAreaLightTexturesLib } from "three/examples/jsm/lights/RectAreaLightTexturesLib.js"
import { RectAreaLightNode } from "three/webgpu"

const RectLight = ({
  levaname='平面光',
  volume = false,
  settings = {},
  debug = false,
  ...props
}) => {
  const [
    {
      color: godrayColor = "white",
      position = [0, 2, 0],
      rotation = [-Math.PI/2, 0, 0],
      width = 0.125,
      height = 0.125,
      power = 1,
      visible = true,
      isHelper = true
    },
    setSettings
  ] = useState(settings)

  const ref = useRef()

  // 初始化 LTC
  useMemo(() => {
    RectAreaLightNode.setLTC(RectAreaLightTexturesLib.init())
  }, [])

  // 更新灯光属性
  useEffect(() => {
    if (ref.current) {
      ref.current.color.set(godrayColor)
      ref.current.power = power        //power = intensity * width * height * Math.PI;
      ref.current.intensity = power / (Math.PI * width * height)
      ref.current.width = width
      ref.current.height = height
      ref.current.visible = visible
      volume && ref.current.layers.enable(10);
    }
  }, [godrayColor, power, width, height, visible,volume])

  useHelper(ref, isHelper && RectAreaLightHelper)


  return (
    <>
      {debug && <RectLightBuilder levaname={levaname} settings={settings} onChange={setSettings} />}
      <rectAreaLight 
        ref={ref}
        name={levaname}
        position={position}
        rotation={rotation}
        {...props}
      />

    </>
  )
}

const RectLightBuilder = ({ levaname, settings, onChange }) => {
  const curControls = useRef({})
  const controls = useControls(levaname, {
    position: {
      value: settings.position || [0, 2, 0],
      step: 0.1,
    },
    rotation: {
      value: settings.rotation || [-Math.PI/2, 0, 0],
      step: 0.01,
    },
    color: {
      value: settings.color || "white",
 
    },
    width: {
      value: settings.width || 0.125,
      min: 0.01,
      max: 10,
      step: 0.01,
    },
    height: {
      value: settings.height || 0.125,
      min: 0.01,
      max: 10,
      step: 0.01,
    },
    power: {
      value: settings.power || 1,
      min: 0,
      max: 2000,
      step: 1,
    },
    visible: {
      value: settings.visible !== undefined ? settings.visible : true,
    },
    isHelper: {
      value: settings.isHelper !== undefined ? settings.isHelper : true,
      label: "helper"
    },
    "Export Settings": button(() => {
      const exportedSettings = {
        position: curControls.current.position,
        rotation: curControls.current.rotation,
        color: curControls.current.color,
        width: curControls.current.width,
        height: curControls.current.height,
        power: curControls.current.power,
        visible: curControls.current.visible,
        isHelper: curControls.current.isHelper,
      }
      console.log(levaname, JSON.stringify(exportedSettings, null, 2))
      navigator.clipboard?.writeText(JSON.stringify(exportedSettings, null, 2))
    })
  })
  
  curControls.current = controls

  useEffect(() => {
    onChange(controls)
  }, [controls, onChange])

  return null
}

export default RectLight