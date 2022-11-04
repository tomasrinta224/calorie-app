export const makeQueryString = (
  queryParams: Record<string, unknown>
): string => {
  const paramsEntries = Object.entries(queryParams);
  if (paramsEntries.length === 0) {
    return "";
  }
  const paramsStrs = Object.entries(queryParams).map(([key, value]) =>
    Array.isArray(value)
      ? value.map((x) => `${key}=${x}`).join("&")
      : value !== undefined
      ? `${key}=${value}`
      : ""
  );
  return `?${paramsStrs.filter((param) => param).join("&")}`;
};
