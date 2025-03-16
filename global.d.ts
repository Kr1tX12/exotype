export {};

declare global {
  interface Window {
    yaContextCb: Array<() => void>;
  }

  interface YaContext {
    Context: {
      AdvManager: {
        render: (params: { blockId: string; renderTo: string }) => void;
      };
    };
  }

  const Ya: YaContext;
}
