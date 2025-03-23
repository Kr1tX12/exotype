import { Config } from "../types/actions-bar.types";
import {
  IconAdjustmentsFilled,
  IconBook2,
  IconBrain,
  IconCircleLetterW,
  IconClock,
  IconGrid3x3,
  IconNumber52Small,
} from "@tabler/icons-react";

export const PARAMS_CONFIG_TIME: Config = {
  id: "PARAMS_CONFIG_TIME",
  config: [
    {
      storeKey: "time",
      value: 10,
      label: "10",
    },
    {
      storeKey: "time",
      value: 30,
      label: "30",
    },
    {
      storeKey: "time",
      value: 60,
      label: "60",
    },
    {
      storeKey: "time",
      value: 120,
      label: "120",
    },
    {
      storeKey: "time",
      value: 360,
      label: "360",
    },
  ],
};

export const PARAMS_CONFIG_WORDS: Config = {
  id: "PARAMS_CONFIG_WORDS",
  config: [
    {
      storeKey: "words",
      value: 10,
      label: "10",
    },
    {
      storeKey: "words",
      value: 25,
      label: "25",
    },
    {
      storeKey: "words",
      value: 50,
      label: "50",
    },
    {
      storeKey: "words",
      value: 100,
      label: "100",
    },
    {
      storeKey: "words",
      value: 1000000,
      label: "1000000",
    },
  ],
};

export const PARAMS_CONFIG_SENTENCES: Config = {
  id: "PARAMS_CONFIG_SENTENCES",
  config: [
    {
      storeKey: "sentences",
      value: 1,
      label: "1",
    },
    {
      storeKey: "sentences",
      value: 2,
      label: "2",
    },
    {
      storeKey: "sentences",
      value: 5,
      label: "5",
    },
    {
      storeKey: "sentences",
      value: 10,
      label: "10",
    },
    {
      storeKey: "sentences",
      value: 25,
      label: "25",
    },
  ],
};

export const MODE_CONFIG: Config = {
  id: "MODE_CONFIG",
  config: [
    {
      storeKey: "mode",
      value: "time",
      label: "время",
      icon: IconClock,
    },
    {
      storeKey: "mode",
      value: "words",
      label: "слова",
      icon: IconCircleLetterW,
    },
    {
      storeKey: "mode",
      value: "texts",
      label: "тексты",
      icon: IconBook2,
    },
    {
      storeKey: "mode",
      value: "custom",
      label: "кастом",
      icon: IconAdjustmentsFilled,
    },
    {
      storeKey: "mode",
      value: "ai",
      label: "ИИ",
      icon: IconBrain,
      tooltip: "Искусственная интуиция",
    },
  ],
};

export const FEATURES_CONFIG: Config = {
  id: "FEATURES_CONFIG",
  config: [
    {
      storeKey: "punctuation",
      label: "пунктуация",
      value: true,
      icon: IconGrid3x3,
    },
    {
      storeKey: "numbers",
      label: "цифры",
      value: true,
      icon: IconNumber52Small,
    },
  ],
};
