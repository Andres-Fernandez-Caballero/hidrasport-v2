import { useState, useEffect } from 'react';
import { useAuthStore } from "@store/auth/auth.store";
import urls from '@config/urls';
import { IPermissionLevel, IPermissionResponse } from '@pages/api/Permissions';

const usePermissionLevel = (): IPermissionResponse => {
  const [authResponse, setAuthResponse] = useState<IPermissionLevel | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<Error | null>(null);
  const { userSession } = useAuthStore();
  const token = userSession?.token;

  useEffect(() => {
    const fetchData = async () => {
      setAuthLoading(true);
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
    };

    fetchData();
  }, [token]);

  return { authResponse, authLoading, authError };
};

export default usePermissionLevel;
