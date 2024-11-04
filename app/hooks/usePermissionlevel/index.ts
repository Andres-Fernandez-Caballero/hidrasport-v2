import { useEffect } from 'react';
import useFetch from '../useFetch';
import urls from '@config/urls';
import { IPermissionLevel, IPermissionResponse } from '@pages/api/Permissions';

const usePermissionLevel = (): IPermissionResponse => {
  const { response, loading, error, fetchData } = useFetch<IPermissionLevel>();

  const handleFetchData = async () => {
    await fetchData(urls.permission, 'GET')
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return { authResponse: response, authLoading: loading, authError: error };
};

export default usePermissionLevel;
