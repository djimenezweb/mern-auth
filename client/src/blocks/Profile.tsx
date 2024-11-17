import useAuth from '@/hooks/useAuth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Logout from './Logout';

export default function Profile() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.username}</CardTitle>
        <CardDescription className="space-x-2">
          {user.roles.map(r => (
            <span key={r}>{r}</span>
          ))}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Avatar>
          <AvatarFallback>{user.username[0]}</AvatarFallback>
        </Avatar>
      </CardContent>
      <CardFooter>
        <Logout />
      </CardFooter>
    </Card>
  );
}
