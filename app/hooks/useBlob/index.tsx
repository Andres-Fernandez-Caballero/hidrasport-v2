import { useState } from "react";

const useBlob = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const localStorageItem = localStorage.getItem("auth-storage");
  let token: string | null = null;

  const requestBlob = async (url: string): Promise<Blob> => {
    setLoading(true);
    setError(null);

    try {
      if (localStorageItem) {
        const localStorageData = JSON.parse(localStorageItem);
        token = localStorageData?.state?.userSession?.token || null;
      }

      const headers: Record<string, string> = {
        ...(token ? { Authorization: `Token ${token}` } : {}),
      };

      const response = await fetch(url, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      return await response.blob();
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { requestBlob, loading, error };
};

export default useBlob;
