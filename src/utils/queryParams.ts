interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}

export const buildPathWithQueryParams = (
  path: string,
  queryParams: QueryParams
): string => {
  const url = new URL(path, "http://localhost");

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.pathname + "?" + url.searchParams;
};
