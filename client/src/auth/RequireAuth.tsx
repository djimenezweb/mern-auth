import useAuth from '@/hooks/useAuth';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Role } from '@/types';

type RequireAuthProps = {
  children: JSX.Element;
  role?: Role;
};

const RequireAuth = ({ children, role = 'user' }: RequireAuthProps) => {
  const { user } = useAuth();

  if (!user || !user.roles.includes(role))
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>
            <span className="capitalize">{role}s</span> only
          </CardTitle>
          <CardDescription>Login or signup to continue</CardDescription>
        </CardHeader>
      </Card>
    );

  return children;
};
export default RequireAuth;
