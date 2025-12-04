import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);


// Fade In
gsap.registerEffect({
  name: "FadeIn",
  effect: (targets, config) => {
    return gsap.fromTo(
      targets,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        duration: config.duration,
      }
    );
  },
  defaults: {
    duration: 0.8,
  },
  extendTimeline: true
});

// Slide In
gsap.registerEffect({
  name: "SlideIn",
  effect: (targets, config) => {
    // 先设置初始状态
    gsap.set(targets, { autoAlpha: 0 });

    let x = 0, y = 0;
    switch (config.direction) {
      case "up":
        y = - (config.distance || 50);
        break;
      case "down":
        y = config.distance || 50;
        break;
      case "left":
        x = - (config.distance || 50);
        break;
      case "right":
        x = config.distance || 50;
        break;
    }

    return gsap.to(targets, {
      x: x,
      y: y,
      autoAlpha: 1,
      duration: config.duration || 1,
      ease: config.ease || "power1.in"
    });
  },
  defaults: {
    direction: "up",
    distance: 50,
    duration: 1,
    ease: "power1.in"
  },
  extendTimeline: true
});
// Slide In
gsap.registerEffect({
  name: "SlideIn_Text",
  effect: (targets, config) => {
     
    // 创建拆分文本
    const split = SplitText.create(targets);
    const items =
      config.type === "words"
        ? split.words
        : config.type === "lines"
        ? split.lines
        : split.chars;

    // 位移方向
    let x = 0, y = 0;
    switch (config.direction) {
      case "up":
        y = config.distance;
        break;
      case "down":
        y = -config.distance;
        break;
      case "left":
        x = config.distance;
        break;
      case "right":
        x = -config.distance;
        break;
    }

    // 动画
    return gsap.from(
      items,
      {
        xPercent: x,
        yPercent: y,
        autoAlpha: 0,
        ease: config.ease,
        stagger: config.stagger
      }
    );
  },
  defaults: {
    type: "chars",  // chars, words, lines
    direction: "up",
    distance: 50,
    ease: "power1.inOut",
    stagger: 0.1
  },
  extendTimeline: true
});



// GrowIn
gsap.registerEffect({
  name: "GrowIn",
  effect: (targets, config) => {
    return gsap.fromTo(
      targets,
      {
        autoAlpha: 0,
        scale: config.scale || 0.5
      },
      {
        autoAlpha: 1,
        scale: 1,
        duration: config.duration || 0.8,
        ease: config.ease
      }
    );
  },
  defaults: {
    scale: 0.5,
    duration: 0.8,
    ease: "power1.in"
  },
  extendTimeline: true
});
// ShrinkIn
gsap.registerEffect({
  name: "ShrinkIn",
  effect: (targets, config) => {
    return gsap.fromTo(
      targets,
      {
        autoAlpha: 0,
        scale: config.scale 
      },
      {
        autoAlpha: 1,
        scale: 1,
        duration: config.duration,
        ease: config.ease
      }
    );
  },
  defaults: {
    scale: 1.5,
    duration: 0.8,
    ease: "power1.in"
  },
  extendTimeline: true
});
// SpinIn
gsap.registerEffect({
  name: "SpinIn",
  effect: (targets, config) => {
    return gsap.fromTo(
      targets,
      {
        scale: 0, 
        rotation: config.direction === "left" ? -config.rotate : config.rotate
      },
      {
        scale: 1,
        rotation: 0,
        duration: config.duration,
        ease: config.ease
      }
    );
  },
  defaults: {
    direction: "left",
    rotate: 45,
    duration: 1.5,
    ease: "power1.inOut"
  },
  extendTimeline: true
});
// TwistIn
gsap.registerEffect({
  name: "TwistIn",
  effect: (targets, config) => {
    return gsap.fromTo(
      targets,
      {
        autoAlpha: 0,
        scale: 1.5, 
        rotation: config.direction === "left" ? -config.rotate : config.rotate
      },
      {
        autoAlpha: 1,
        scale: 1,
        rotation: 0,
        duration: config.duration,
        ease: config.ease
      }
    );
  },
  defaults: {
    direction: "left",
    rotate: 10,
    duration: 2,
    ease: "power1.in"
  },
  extendTimeline: true
});
// Move_ScaleIn
gsap.registerEffect({
  name: "Move_ScaleIn",
  effect: (targets, config) => {

    let x = 0, y = 0;
    switch (config.direction) {
      case "up":
        y =  (config.distance || 10);
        break;
      case "down":
        y = -(config.distance || 10);
        break;
      case "left":
        x = (config.distance || 10);
        break;
      case "right":
        x = config.distance || 10;
        break;
    }

    return gsap.from(
      targets,
      {
        autoAlpha: 0,
        x:x,
        y:y,
        scale: 1.1,
        duration: config.duration,
        ease: config.ease
      }
    );
  },
  defaults: {
    direction: "up",
    duration: 1,
    scale: 1.1,
    ease: "power1.in"
  },
  extendTimeline: true
});
// MaskReveal
gsap.registerEffect({
  name: "MaskReveal",
  effect: (targets, config) => {
    let clipFrom, clipTo;

    switch (config.direction) {
      case "up":
        // 从下 → 上（下边 100%）
        clipFrom = "inset(100% 0 0 0)";
        clipTo = "inset(0% 0 0 0)";
        break;

      case "down":
        // 从上 → 下（上边 100%）
        clipFrom = "inset(0 0 100% 0)";
        clipTo = "inset(0 0 0% 0)";
        break;

      case "left":
        // 从右 → 左（右边 100%）
        clipFrom = "inset(0 0 0 100%)";
        clipTo = "inset(0 0 0 0%)";
        break;

      case "right":
        // 从左 → 右（左边 100%）
        clipFrom = "inset(0 100% 0 0)";
        clipTo = "inset(0 0% 0 0)";
        break;
    }

    return gsap.fromTo(
      targets,
      { 
        clipPath: clipFrom 
      },
      {
        clipPath: clipTo,
        duration: config.duration,
        ease: config.ease
      }
    );
  },

  defaults: {
    direction: "down",
    duration: 1,
    ease: "power1.in"
  },

  extendTimeline: true
});
//MaskCenter
gsap.registerEffect({
  name: "MaskCenter",
  effect: (targets, config) => {
    return gsap.fromTo(
      targets,
      {
         clipPath: "inset(50% 0% 50% 0%)"
      },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: config.duration ,
        ease: config.ease 
      }
    );
  },
  defaults: {
    angle: 10,
    duration: 1,
    ease: "power1.in"
  },
  extendTimeline: true
});
//BlurIn
gsap.registerEffect({
  name: "BlurIn",
  effect: (targets, config) => {
    return gsap.fromTo(
      targets,
      {
        autoAlpha: 0,
        filter: `blur(${config.blur})`
      },
      {
        autoAlpha: 1,
        filter: "blur(0px)",
        duration: config.duration ,
        ease: config.ease 
      }
    );
  },
  defaults: {
    blur: "10px",
    duration: 0.8,
    ease: "power1.in"
  },
  extendTimeline: true
});
//BlurIn
gsap.registerEffect({
  name: "BlurIn_SlideIn",
  effect: (targets, config) => {
    // gsap.set(targets, { autoAlpha: 0, filter: `blur(${config.blur})` })
    let x = 0, y = 0;
    switch (config.direction) {
      case "up":
        y = (config.distance || 50);
        break;
      case "down":
        y = - (config.distance || 50);
        break;
      case "left":
        x = (config.distance || 50);
        break;
      case "right":
        x = - (config.distance || 50);
        break;
    }


    return gsap.from(
      targets,
      {
        autoAlpha: 0,
        filter: `blur(${config.blur})`,
        x: x,
        y: y,
        duration: config.duration ,
        ease: config.ease 
      }
    );
  },
  defaults: {
    blur: "20px",
    direction: "right",
    distance: 50,
    duration: 0.8,
    ease: "power1.in"
  },
  extendTimeline: true
});
//Blur_ScaleIn
gsap.registerEffect({
  name: "Blur_ScaleIn",
  effect: (targets, config) => {
    return gsap.from(
      targets,
      {
        autoAlpha: 0,
        filter: `blur(${config.blur})`,
        scale: 0.5,
        duration: config.duration ,
        ease: config.ease 
      }
    );
  },
  defaults: {
    blur: "20px",
    scale: 0.5,
    duration: 0.8,
    ease: "power1.in"
  },
  extendTimeline: true
});