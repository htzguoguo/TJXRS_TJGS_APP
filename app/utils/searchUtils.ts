export function buildSearchParamsUrl(baseUrl: string, obj: {}) {
  const params: string[] = [];
  for (const key in obj) {
    if (obj[key]) {
      if (typeof obj[key] === "string" && obj[key].length > 0) {
        params.push(`${key}=${obj[key]}`);
      } else if (typeof obj[key] === "number") {
        params.push(`${key}=${obj[key]}`);
      }
    }
  }
  return `${baseUrl}?${params.join("&")}`;
}