import gsap from "gsap";


// Fade out
gsap.registerEffect({
  name: "FadeOut",
  effect: (targets, config) => {
    
    return gsap.to(
      targets,
      {
        autoAlpha: 0,
        duration: config.duration,
      }
    );
  },
  defaults: {
    duration: 0.8,
  },
  extendTimeline: true
});


// SlideOut
gsap.registerEffect({
  name: "SlideOut",
  effect: (targets, config) => {
    // 先设置初始状态
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
      autoAlpha: 0,
      duration: config.duration,
      ease: config.ease
    });
  },
  defaults: {
    direction: "up",
    distance: 50,
    duration: 0.8,
    ease: "power1.out"
  },
  extendTimeline: true
});
// GrowOut
gsap.registerEffect({
  name: "GrowOut",
  effect: (targets, config) => {
    return gsap.to(
      targets,
      {
        autoAlpha: 0,
        scale: config.scale,
        duration: config.duration,
        ease: config.ease
      }
    );
  },
  defaults: {
    scale: 1.5,
    duration: 0.8,
    ease: "power1.out"
  },
  extendTimeline: true
});
// ShrinkOut
gsap.registerEffect({
  name: "ShrinkOut",
  effect: (targets, config) => {
    return gsap.to(
      targets,
      {
        autoAlpha: 0,
        scale: config.scale,
        duration: config.duration,
        ease: config.ease
      }
    );
  },
  defaults: {
    scale: 0.5,
    duration: 0.8,
    ease: "power1.out"
  },
  extendTimeline: true
});
// SpinOut
gsap.registerEffect({
  name: "SpinOut",
  effect: (targets, config) => {
    return gsap.to(
      targets,
      {
        scale: 0,
        rotation: config.direction === "left" ? -config.rotate : config.rotate,
        duration: config.duration,
        ease: config.ease
      }
    );
  },
  defaults: {
    direction: "left",
    rotate: 45,
    duration: 0.8,
    ease: "power1.inOut"
  },
  extendTimeline: true
});

// TwistOut
gsap.registerEffect({
  name: "TwistOut",
  effect: (targets, config) => {
    return gsap.to(
      targets,
      {
        autoAlpha: 0,
        scale: 1.5,
        rotation: config.direction === "left" ? config.rotate : -config.rotate,
        duration: config.duration,
        ease: config.ease
      }
    );
  },
  defaults: {
    direction: "left",
    rotate: 10,
    duration: 0.8,
    ease: "power1.out"
  },
  extendTimeline: true
});

// MaskRevealOut
gsap.registerEffect({
  name: "MaskRevealOut",
  effect: (targets, config) => {
    let clipFrom, clipTo;

    switch (config.direction) {
      case "up":
        // 从下 → 上（下边 100%）
        clipFrom = "inset(0% 0 100% 0)";
        clipTo = "inset(0% 0 0% 0)";
        break;

      case "down":
        // 从上 → 下（上边 100%）
        clipFrom = "inset(100% 0 0% 0)";
        clipTo = "inset(0% 0 0% 0)";
        break;

      case "left":
        // 从右 → 左（右边 100%）
        clipFrom = "inset(0 100% 0 0%)";
        clipTo = "inset(0 0% 0 0%)";
        break;

      case "right":
        // 从左 → 右（左边 100%）
        clipFrom = "inset(0 0% 0 100%)";
        clipTo = "inset(0 0% 0 0%)";
        break;
    }

    return gsap.fromTo(
      targets,
      { 
        clipPath: clipTo 
      },
      {
        clipPath: clipFrom,
        duration: config.duration,
        ease: config.ease
      }
    );
  },

  defaults: {
    direction: "left",
    duration: 0.8,
    ease: "power1.inOut"
  },

  extendTimeline: true
});

//MaskCenterOut
gsap.registerEffect({
  name: "MaskCenterOut",
  effect: (targets, config) => {
    return gsap.fromTo(
      targets,
      {
         clipPath: "inset(0% 0% 0% 0%)"
      },
      {
        clipPath: "inset(50% 0% 50% 0%)",
        duration: config.duration ,
        ease: config.ease 
      }
    );
  },
  defaults: {
    angle: 10,
    duration: 1,
    ease: "power1.out"
  },
  extendTimeline: true
});

//BlurOut
gsap.registerEffect({
  name: "BlurOut",
  effect: (targets, config) => {
    return gsap.fromTo(
      targets,
      {
        autoAlpha: 1,
        filter: `blur(0px)`
      },
      {
        autoAlpha: 0,
        filter: `blur(${config.blur})`,
        duration: config.duration ,
        ease: config.ease 
      }
    );
  },
  defaults: {
    blur: "10px",
    duration: 0.8,
    ease: "power2.out"
  },
  extendTimeline: true
});


//BlurIn
gsap.registerEffect({
  name: "BlurIn_SlideOut",
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
        x = -(config.distance || 50);
        break;
      case "right":
        x =  (config.distance || 50);
        break;
    }


    return gsap.to(
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
    ease: "power2.out"
  },
  extendTimeline: true
});


//Blur_ScaleOut
gsap.registerEffect({
  name: "Blur_ScaleOut",
  effect: (targets, config) => {
    return gsap.to(
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
    ease: "power1.out"
  },
  extendTimeline: true
});