
type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

type RequestOptions<TBody = unknown> = {
  params?: Record<string, string | number | boolean | undefined | null>;
  body?: TBody;
  headers?: Record<string, string>;
};

const BASE_URL = "http://89.169.3.47:8080";

function buildUrl(path: string, params?: RequestOptions["params"]) {
  const url = new URL(path, BASE_URL);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) url.searchParams.append(k, String(v));
    });
  }
  return url.toString();
}

async function request<TResp, TBody = unknown>(
  method: HttpMethod,
  path: string,
  options: RequestOptions<TBody> = {}
): Promise<TResp> {
  const { params, body, headers } = options;
  const url = buildUrl(path, params);

  const init: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(headers ?? {}),
    },
  };

  if (body !== undefined) {
    init.body = typeof body === "string" ? (body as string) : JSON.stringify(body);
  }

  const resp = await fetch(url, init);
  if (!resp.ok) {
    let message = resp.statusText;
    try {
      const data = (await resp.json()) as { message?: string } | unknown;
      if (data && typeof data === "object" && "message" in (data as any)) {
        message = (data as any).message ?? message;
      }
    } catch (_) {
      // ignore json parse errors
    }
    throw new Error(`${resp.status}: ${message}`);
  }

  if (resp.status === 204) return undefined as unknown as TResp;

  return (await resp.json()) as TResp;
}

export const apiInstance = {
  get: <TResp>(path: string, options?: RequestOptions) =>
    request<TResp>("GET", path, options),
  post: <TResp, TBody = unknown>(path: string, options?: RequestOptions<TBody>) =>
    request<TResp, TBody>("POST", path, options),
  patch: <TResp, TBody = unknown>(path: string, options?: RequestOptions<TBody>) =>
    request<TResp, TBody>("PATCH", path, options),
  delete: <TResp>(path: string, options?: RequestOptions) =>
    request<TResp>("DELETE", path, options),
};

export type { RequestOptions };