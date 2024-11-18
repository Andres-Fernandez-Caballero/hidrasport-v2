import { useState } from "react";

const useFetch = <T = undefined, R = unknown>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const request = async (
    url: string,
    method: "GET" | "POST",
    body?: T
  ): Promise<R> => {
    setLoading(true);
    setError(null);

    try {
      let authToken = '';
      const authTokenString = localStorage.getItem('auth-storage');
      if (authTokenString) {
        const authTokenObject = JSON.parse(authTokenString);
        const token = authTokenObject.state.userSession.token;
        authToken = token;
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(authToken ? { Authorization: `Token ${authToken}` } : {}),
        },
        body: method === "POST" ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.detail || "An error occurred");
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

export default useFetch;
