export {};

declare global {
  interface Window {
    yaContextCb: Array<() => void>;
  }

  interface YaContext {
    Context: {
      AdvManager: {
        render: (params: {
          blockId?: string;
          renderTo?: string;
          type?: string;
          platform?: string;
          darkTheme?: boolean;
        }) => void;
      };
    };
  }

  const Ya: YaContext;

  const ymab: (p1: string, p2: string, p3: (answer: unknown) => void) => void;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      slug: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    slug: string;
  }
}
