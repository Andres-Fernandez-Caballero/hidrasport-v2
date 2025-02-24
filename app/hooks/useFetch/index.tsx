import { useState } from "react";

const useApi = <T, R>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const localStorageItem = localStorage.getItem("auth-storage");
  let token: string | null = null;

  const request = async (
    url: string,
    method: "GET" | "POST",
    body?: T
  ): Promise<R> => {
    setLoading(true);
    setError(null);

    try {
      if (localStorageItem) {
        const localStorageData = JSON.parse(localStorageItem);
        token = localStorageData?.state?.userSession?.token || null;
        console.log(token)
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Token ${token}` } : {}),
        },
        body: method === "POST" ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`${errorResponse.detail}`);
      }

      const data = await response.json();
      return data as R;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error };
};

export default useApi;
