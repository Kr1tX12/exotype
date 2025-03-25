import { WindConfig } from "../falling-leaves.types";

export const updateWind = (
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