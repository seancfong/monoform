type URLParams = { [key: string]: string };

export function buildUrl(url: string, params: URLParams) {
  const searchParams = new URLSearchParams(params);
  return `${url}?${searchParams.toString()}`;
}
