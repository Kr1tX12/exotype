import { Color } from "../subcomponents/word";

export const getColorBySpeed = ({
  speed,
  minWpm,
  maxWpm,
}: {
  speed: number;
  minWpm: number;
  maxWpm: number;
}) => {
  let color: Color;
  const normalizedSpeed = (speed - minWpm) / (maxWpm - minWpm);
  if (normalizedSpeed < 0.1667) {
    color = "min";
  } else if (normalizedSpeed < 0.3333) {
    color = "xmin";
  } else if (normalizedSpeed < 0.5) {
    color = "avg";
  } else if (normalizedSpeed < 0.6667) {
    color = "xavg";
  } else if (normalizedSpeed < 0.8333) {
    color = "max";
  } else {
    color = "xmax";
  }

  return color;
};
