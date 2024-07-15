import { useState, useCallback } from 'react';
import { useAuthStore } from "@store/auth/auth.store";

interface FetchState<T> {
  response: T | null;
  loading: boolean;
  error: Error | null;
}

const useFetch = <T, B = Record<string, unknown>>(): FetchState<T> & { fetchData: (url: string, body: B) => Promise<void> } => {
  const [response, setResponse] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { userSession } = useAuthStore();
  const token = userSession?.token;

  const fetchData = useCallback(async (url: string, body: B) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const responseData = await response.json();
      setResponse(responseData);
    } catch (error) {
      setError(error as Error);
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { response, loading, error, fetchData };
};

export default useFetch;