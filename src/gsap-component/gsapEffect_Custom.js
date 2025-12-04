import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { MotionPathHelper } from "gsap/MotionPathHelper";
gsap.registerPlugin(MotionPathPlugin, MotionPathHelper);

// Move
gsap.registerEffect({
  name: "Move",
  effect: (targets, config) => {
 
    return gsap.fromTo(
      targets,
      {
        x: config.x0,
        y: config.y0,
      },
      {
        x: config.x1,
        y: config.y1,
        duration: config.duration,
      },
    );
  },
  defaults: {
    duration: 0.8,
    x0: 0,
    x1: 100,
    y0: 0,
    y1: 0,
  },
  extendTimeline: true
});
// MoveCurvedPath
gsap.registerEffect({
  name: "MoveCurvedPath",
  effect: (targets, config) => {

    const tween = gsap.to(
      targets,
      {
        immediateRender: true,
        duration: config.duration,
        motionPath: {
        path: "#path",
        align: "#path",
        alignOrigin: [0.5, 0.5],
      },
      }
    );
    config.curve && MotionPathHelper.create(targets); 

    return tween
  },
  defaults: {
    duration: 0.8,
    curve: true,  //默认开启 helper，确认后把 helper 关闭，并复制 path 到 svg
  },
  extendTimeline: true
});

// Scale


gsap.registerEffect({
  name: "Scale",
  effect: (targets, config) => {
    return gsap.fromTo(
      targets,
      {
        
        scale: config.scale0,
      },
      {
        scale: config.scale1,
        duration: config.duration,
        ease: config.ease
      },
    );
  },
  defaults: {
    duration: 0.8,
    scale0: 1,
    scale1: 1.5,
    ease: "power1.inOut",
  },
  extendTimeline: true
});
// Rotate
gsap.registerEffect({
  name: "Rotate",
  effect: (targets, config) => {
    return gsap.fromTo(
      targets,
      {
        rotate: config.rotate0,
      },
      {
        rotate: config.rotate1,
        duration: config.duration,
        ease: config.ease
      },
    );
  },
  defaults: {
    duration: 0.8,
    rotate0: 0,
    rotate1: 45,
    ease: "power1.inOut",
  },
  extendTimeline: true
});
// Opacity
gsap.registerEffect({
  name: "Opacity",
  effect: (targets, config) => {
    return gsap.fromTo(
      targets,
      {
        autoAlpha: config.opacity0,
      },
      {
        autoAlpha: config.opacity1,
        duration: config.duration,
        ease: config.ease
      },
    );
  },
  defaults: {
    duration: 0.8,
    opacity0: 1,
    opacity1: 0.5,
    ease: "power1.inOut",
  },
  extendTimeline: true
});
// Color

// Shadow
gsap.registerEffect({
  name: "Shadow",
  effect: (targets, config) => {

    // 构造 drop-shadow 字符串函数
    const makeShadow0 = (c) =>
      `drop-shadow(${config.offsetX0}px ${config.offsetY0}px ${config.blur0}px ${c})`;
    const makeShadow1 = (c) =>
      `drop-shadow(${config.offsetX1}px ${config.offsetY1}px ${config.blur1}px ${c})`;

    return gsap.fromTo(
      targets,
      {
        filter: makeShadow0(config.color0),
        opacity: config.opacity0,
      },
      {
        filter: makeShadow1(config.color1),
        opacity: config.opacity1,
        duration: config.duration,
        ease: config.ease,
      }
    );
  },
  defaults: {
    offsetX0: 0,
    offsetY0: 0,
    offsetX1: 20,
    offsetY1: 20,
    blur0: 0,
    blur1: 8,
    opacity0: 1,
    opacity1: 1,
    color0: "#000000",
    color1: "#000000",
    duration: 0.8,
    ease: "power1.inOut",
  },
  extendTimeline: true,
});

// CornerRaduis
gsap.registerEffect({
  name: "CornerRaduis",
  effect: (targets, config) => {
    return gsap.fromTo(
      targets,
      {
        borderRadius: 0,
      },
      {
        borderRadius: config.borderRadius,
        duration: config.duration,
      }
    );
  },
  defaults: {
    duration: 0.8,
    borderRadius: 20,
  },
  extendTimeline: true
});
// Stroke
gsap.registerEffect({
  name: "Stroke",
  effect: (targets, config) => {
    return gsap.fromTo(
      targets,
      {
        outlineWidth: 0,
      },
      {
        outlineWidth: config.strokeWidth,
        duration: config.duration,
      }
    );
  },
  defaults: {
    duration: 0.8,
    strokeWidth: 20,
  },
  extendTimeline: true
});

// Stroke
gsap.registerEffect({
  name: "Border",
  effect: (targets, config) => {

    // 如果颜色带透明度，就自动用 rgba
    const borderFrom = `${config.color0}`;
    const borderTo   = `${config.color1}`;

    return gsap.fromTo(
      targets,
      {
        borderWidth: 0,
        borderColor: borderFrom,
        borderStyle: "solid",
        borderRadius: config.radius0,
      },
      {
        borderWidth: config.strokeWidth,
        borderColor: borderTo,
        borderRadius: config.radius1,
        duration: config.duration,
        ease: config.ease,
      }
    );
  },
  defaults: {
    duration: 0.8,
    strokeWidth: 20,
    color0: "rgba(0,0,0,0)",   // 初始透明
    color1: "rgba(0,0,0,1)",   // 最终颜色
    radius0: 0,
    radius1: 0,
    ease: "power1.inOut",
  },
  extendTimeline: true,
});
// Outline
gsap.registerEffect({
  name: "Outline",
  effect: (targets, config) => {
    // 一次性设置 style 避免每帧触发 layout 计算
    gsap.set(targets, {
      outlineStyle: config.style0,
      outlineColor: config.color0,
      outlineWidth: config.width0,
      outlineOffset: config.offset0
    });

    return gsap.to(targets, {
      outlineColor: config.color1,
      outlineWidth: config.width1,
      outlineOffset: config.offset1,
      duration: config.duration,
      ease: config.ease,
      // 明确声明单位，避免字符串重新构建
      modifiers: {
        outlineWidth: v => `${parseFloat(v)}px`,
        outlineOffset: v => `${parseFloat(v)}px`
      }
    });
  },
  defaults: {
    duration: 0.8,
    width0: 0,
    width1: 10,
    offset0: 0,
    offset1: -5,
    color0: "rgba(0,0,0,0)",
    color1: "rgba(0,0,0,1)",
    style0: "solid",
    ease: "power1.inOut"
  },
  extendTimeline: true
});