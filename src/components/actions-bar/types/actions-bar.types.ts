export type ActionsConfig = {
  storeKey: string;
  value?: unknown;
  label: string;
  icon?: React.ComponentType<{ className?: string; style?: object }>;
  tooltip?: string;
};

export type Config = {
  id: string;
  config: ActionsConfig[];
};
