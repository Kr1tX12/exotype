import { MotionValue } from "framer-motion";

export interface LeafRotation {
  axis: "X" | "Y" | "Z";
  value: number;
  speed: number;
  x: number;
}

export interface Leaf {
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

export interface WindConfig {
  magnitude: number;
  maxSpeed: number;
  duration: number;
  start: number;
  speed: (t: number, y: number) => number;
}
