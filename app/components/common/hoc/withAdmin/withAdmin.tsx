import { useEffect } from 'react';
import { useRouter } from 'next/router';
import usePermissionLevel from 'app/hooks/usePermissionlevel';

interface WithAdminProps {
  nextPage: () => void;
}

const withAdmin = <P extends WithAdminProps>(WrappedComponent: React.ComponentType<P>) => {
  const HOC: React.FC<Omit<P, keyof WithAdminProps>> = (props) => {
    const { authResponse, authLoading, authError } = usePermissionLevel();
    const router = useRouter();

    useEffect(() => {
      if (!authLoading && (authError || (authResponse && !authResponse.admin))) {
        router.push('/');
      }
    }, [authLoading, authResponse, authError, router]);

    if (authLoading) return <div>Loading...</div>;

    return <WrappedComponent {...(props as P)} nextPage={() => {}} />;
  };

  HOC.displayName = `WithAdmin(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return HOC;
};

export default withAdmin;
