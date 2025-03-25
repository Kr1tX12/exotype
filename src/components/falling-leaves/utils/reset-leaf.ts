import { Leaf } from "../falling-leaves.types";

export const resetLeaf = (
  leaf: Leaf,
  container: HTMLElement,
  timer: number
): void => {
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
