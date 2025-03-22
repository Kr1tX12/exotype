export type ActionsConfig = {
  storeKey: string;
  value?: unknown;
  label: string;
  icon?: React.ComponentType<{ className?: string; style?: object }>;
};

export type Config = {
  id: string;
  config: ActionsConfig[];
};
