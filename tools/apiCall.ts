type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
interface ApiCall {
  url: string;
  method?: Method;
  body?: unknown;
  token?: string;
}

export async function apiCall<T>({
  url,
  method = "GET",
  body,
  token,
}: ApiCall): Promise<T> {
  const response = await fetch(url, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Token ${token}` : "",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
}
