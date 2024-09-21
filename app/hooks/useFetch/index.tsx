import { useState, useCallback } from 'react';
import { useAuthStore } from "@store/auth/auth.store";

interface FetchState<T> {
  response: T | null;
  loading: boolean;
  error: Error | null;
}

const useFetch = <T, B = Record<string, unknown>>(): FetchState<T> & { fetchData: (url: string, method: 'GET' | 'POST', body?: B) => Promise<void> } => {
  const [response, setResponse] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { userSession } = useAuthStore();
  const token = userSession?.token;

  const fetchData = useCallback(async (url: string, method: 'GET' | 'POST', body?: B) => {
    setLoading(true);
    setError(null);
    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      };

      if (method === 'POST' && body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const responseData = await response.json();
      setResponse(responseData);
    } catch (error) {
      setError(error as Error);
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { response, loading, error, fetchData };
};

export default useFetch;
