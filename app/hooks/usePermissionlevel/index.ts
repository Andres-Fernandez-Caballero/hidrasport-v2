import { useState, useEffect } from 'react';
import { useAuthStore } from "@store/auth/auth.store";
import urls from '@config/urls';
import { IPermissionLevel, IPermissionResponse } from '@pages/api/Permissions';

const MAX_RETRIES = 5;
const RETRY_DELAY = 1000; // 1 second

const usePermissionLevel = (): IPermissionResponse => {
  const [authResponse, setAuthResponse] = useState<IPermissionLevel | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true); // Start loading as true
  const [authError, setAuthError] = useState<Error | null>(null);
  const { userSession } = useAuthStore();
  const token = userSession?.token;

  useEffect(() => {
    let retries = 0;

    const fetchData = async () => {
      if (!token && retries < MAX_RETRIES) {
        retries++;
        setTimeout(fetchData, RETRY_DELAY);
        return;
      }

      if (token) {
        try {
          const response = await fetch(urls.permission, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch permissions');
          }

          const responseData: IPermissionLevel = await response.json();
          setAuthResponse(responseData);
        } catch (error) {
          setAuthError(error as Error);
          console.error('Error fetching permissions:', error);
        } finally {
          setAuthLoading(false);
        }
      } else if (retries >= MAX_RETRIES) {
        setAuthError(new Error('Token is missing after maximum retries'));
        setAuthLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (authLoading) {
    return { authResponse: null, authLoading: true, authError: null };
  }

  return { authResponse, authLoading, authError };
};

export default usePermissionLevel;
