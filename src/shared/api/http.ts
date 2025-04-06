// Небольшая утилита для запросов, мать его
interface IHttpOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: unknown;
}

export const http = async <T>(
  url: string,
  options: IHttpOptions = {}
): Promise<T> => {
  const { method = "GET", headers = {}, body } = options;

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    throw new Error(`Ошибка при запросе на ${url}`);
  }

  return res.json();
};
