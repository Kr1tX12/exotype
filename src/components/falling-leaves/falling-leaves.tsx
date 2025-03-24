/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, MotionValue } from "framer-motion";

interface LeafRotation {
  axis: "X" | "Y" | "Z";
  value: number;
  speed: number;
  x: number;
}

interface Leaf {
  id: number;
  x: number;
  y: number;
  z: number;
  rotation: LeafRotation;
  xSpeedVariation: number;
  ySpeed: number;
  xMotion: MotionValue<number>;
  yMotion: MotionValue<number>;
  zMotion: MotionValue<number>;
  rotationMotion: MotionValue<number>;
  transformMotion: MotionValue<string>;
}

interface WindConfig {
  magnitude: number;
  maxSpeed: number;
  duration: number;
  start: number;
  speed: (t: number, y: number) => number;
}

const NUM_LEAVES = 20;

const resetLeaf = (leaf: Leaf, container: HTMLElement, timer: number): void => {
  const width = container.clientWidth;
  const height = container.clientHeight;
  leaf.x = width * 2 - Math.random() * width * 1.75;
  leaf.y = -10;
  leaf.z = Math.random() * 200;

  if (leaf.x > width) {
    leaf.x = width + 10;
    leaf.y = Math.random() * (height / 2);
  }
  if (timer === 0) {
    leaf.y = Math.random() * height;
  }

  const randomAxis = Math.random();
  if (randomAxis > 0.5) {
    leaf.rotation.axis = "X";
    leaf.rotation.value = 0;
    leaf.rotation.speed = Math.random() * 10;
    leaf.rotation.x = 0;
  } else if (randomAxis > 0.25) {
    leaf.rotation.axis = "Y";
    leaf.rotation.value = 0;
    leaf.rotation.speed = Math.random() * 10;
    leaf.rotation.x = Math.random() * 180 + 90;
  } else {
    leaf.rotation.axis = "Z";
    leaf.rotation.value = 0;
    leaf.rotation.speed = Math.random() * 3;
    leaf.rotation.x = Math.random() * 360 - 180;
  }
  leaf.xSpeedVariation = Math.random() * 0.8 - 0.4;
  leaf.ySpeed = Math.random() + 1.5;

  leaf.xMotion.set(leaf.x);
  leaf.yMotion.set(leaf.y);
  leaf.zMotion.set(leaf.z);
  leaf.rotationMotion.set(leaf.rotation.value);
  leaf.transformMotion.set(
    `translate3d(${leaf.x}px, ${leaf.y}px, ${leaf.z}px) rotate${
      leaf.rotation.axis
    }(${leaf.rotation.value}deg)${
      leaf.rotation.axis !== "X" ? ` rotateX(${leaf.rotation.x}deg)` : ""
    }`
  );
};

const updateWind = (
  wind: WindConfig,
  container: HTMLElement,
  timer: number
): void => {
  const height = container.clientHeight;
  if (timer === 0 || timer > wind.start + wind.duration) {
    wind.magnitude = Math.random() * wind.maxSpeed;
    wind.duration = wind.magnitude * 50 + (Math.random() * 20 - 10);
    wind.start = timer;
    wind.speed = (t: number, y: number) => {
      const a = (wind.magnitude / 2) * ((height - (2 * y) / 3) / height);
      return (
        a * Math.sin(((2 * Math.PI) / wind.duration) * t + (3 * Math.PI) / 2) +
        a
      );
    };
  }
};

const updateLeaf = (
  leaf: Leaf,
  wind: WindConfig,
  container: HTMLElement,
  timer: number
): void => {
  const windSpeed = wind.speed(timer - wind.start, leaf.y);
  const xSpeed = windSpeed + leaf.xSpeedVariation;

  leaf.x -= xSpeed;
  leaf.y += leaf.ySpeed;
  leaf.rotation.value += leaf.rotation.speed;

  leaf.xMotion.set(leaf.x);
  leaf.yMotion.set(leaf.y);
  leaf.rotationMotion.set(leaf.rotation.value);

  const t = `translate3d(${leaf.x}px, ${leaf.y}px, ${leaf.z}px) rotate${
    leaf.rotation.axis
  }(${leaf.rotation.value}deg)${
    leaf.rotation.axis !== "X" ? ` rotateX(${leaf.rotation.x}deg)` : ""
  }`;
  leaf.transformMotion.set(t);

  const height = container.clientHeight;
  if (leaf.x < -10 || leaf.y > height + 10) {
    resetLeaf(leaf, container, timer);
  }
};

const LeafScene = ({ leafSrc }: { leafSrc: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef(0);
  const windConfig = useRef<WindConfig>({
    magnitude: 1.2,
    maxSpeed: 12,
    duration: 300,
    start: 0,
    speed: () => 0,
  }).current;

  // Создаем массивы motion values с использованием Array.from — порядок вызовов гарантированно одинаковый.
  const xMotions = Array.from({ length: NUM_LEAVES }, () =>
    useMotionValue<number>(0)
  );
  const yMotions = Array.from({ length: NUM_LEAVES }, () =>
    useMotionValue<number>(0)
  );
  const zMotions = Array.from({ length: NUM_LEAVES }, () =>
    useMotionValue<number>(0)
  );
  const rotationMotions = Array.from({ length: NUM_LEAVES }, () =>
    useMotionValue<number>(0)
  );
  const transformMotions = Array.from({ length: NUM_LEAVES }, () =>
    useMotionValue<string>("")
  );

  // Инициализация листьев — выполняется один раз.
  const leavesRef = useRef<Leaf[]>([]);
  if (leavesRef.current.length === 0) {
    for (let i = 0; i < NUM_LEAVES; i++) {
      leavesRef.current.push({
        id: i,
        x: 0,
        y: 0,
        z: 0,
        rotation: {
          axis: "X",
          value: 0,
          speed: 0,
          x: 0,
        },
        xSpeedVariation: 0,
        ySpeed: 0,
        xMotion: xMotions[i],
        yMotion: yMotions[i],
        zMotion: zMotions[i],
        rotationMotion: rotationMotions[i],
        transformMotion: transformMotions[i],
      });
    }
  }

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    leavesRef.current.forEach((leaf) => {
      resetLeaf(leaf, container, timerRef.current);
    });

    const handleResize = (): void => {
      // Размеры контейнера обновятся в следующем кадре.
    };
    window.addEventListener("resize", handleResize);

    let animationFrame: number;
    const animate = (): void => {
      updateWind(windConfig, container, timerRef.current);
      leavesRef.current.forEach((leaf) =>
        updateLeaf(leaf, windConfig, container, timerRef.current)
      );
      timerRef.current++;
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, [windConfig]);

  return (
    <div
      ref={containerRef}
      className="leaf-scene absolute inset-0 overflow-hidden"
      style={{
        WebkitTransformStyle: "preserve-3d",
        transformStyle: "preserve-3d",
        WebkitPerspective: "400px",
        MozPerspective: "400px",
        perspective: "400px",
      }}
    >
      {leavesRef.current.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute w-5 h-5 bg-no-repeat"
          style={{
            transform: leaf.transformMotion,
            WebkitTransformStyle: "preserve-3d",
            transformStyle: "preserve-3d",
            WebkitBackfaceVisibility: "visible",
            backfaceVisibility: "visible",
            backgroundImage: `url('${leafSrc}')`,
            backgroundSize: "100%",
          }}
        />
      ))}
    </div>
  );
};

export default function FallingLeaves({ leafSrc }: { leafSrc: string }) {
  return (
    <div className="absolute inset-0 -z-20 bg-center bg-cover">
      <LeafScene leafSrc={leafSrc} />
    </div>
  );
}
