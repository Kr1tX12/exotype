/* eslint-disable react-hooks/rules-of-hooks */
import { useMotionValue, motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { NUM_LEAVES } from "../falling-leaves.constants";
import { WindConfig, Leaf } from "../falling-leaves.types";
import { resetLeaf } from "../utils/reset-leaf";
import { updateLeaf } from "../utils/update-leaf";
import { updateWind } from "../utils/update-wind";

export const LeafScene = ({ leafSrc }: { leafSrc: string }) => {
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
