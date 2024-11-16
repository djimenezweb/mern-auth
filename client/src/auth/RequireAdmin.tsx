import useAuth from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';

const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();

  if (!user) return null;

  if (!user.roles.includes('admin'))
    return (
      <Card>
        <CardContent>
          <p>Admins only</p>
          <p>Login or signup to continue</p>
        </CardContent>
      </Card>
    );

  return children;
};
export default RequireAdmin;
