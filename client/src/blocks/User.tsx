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
import { Button } from '@/components/ui/button';

export default function User() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{user.username}</CardTitle>
        <CardDescription>{user.role}</CardDescription>
      </CardHeader>
      <CardContent>
        <Avatar>
          <AvatarFallback>{user.username[0]}</AvatarFallback>
        </Avatar>
      </CardContent>
      <CardFooter>
        <Button variant="destructive" className="w-full">
          Logout
        </Button>
      </CardFooter>
    </Card>
  );
}
