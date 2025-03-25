import { Leaf, WindConfig } from "../falling-leaves.types";
import { resetLeaf } from "./reset-leaf";

export const updateLeaf = (
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
