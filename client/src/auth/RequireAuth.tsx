import useAuth from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const user = useAuth();

  if (!user)
    return (
      <Card>
        <CardContent>
          <p>Users only</p>
          <p>Login or signup to continue</p>
        </CardContent>
      </Card>
    );

  return children;
};
export default RequireAuth;
