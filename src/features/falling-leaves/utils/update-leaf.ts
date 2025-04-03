import { Leaf, WindConfig } from "../falling-leaves.types";
import { resetLeaf } from "./reset-leaf";

export const updateLeaf = (
  leaf: Leaf,
  wind: WindConfig,
  container: HTMLElement,
  timer: number
): void => {
  const isClose = !(leaf.id % 10);

  const windSpeed = wind.speed(timer - wind.start, leaf.y) * (isClose ? 2 : 1);
  const xSpeed = (windSpeed + leaf.xSpeedVariation) * (isClose ? 2 : 1);

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
  if (leaf.x < -50 || leaf.y > height + 50) {
    resetLeaf(leaf, container, timer);
  }
};
