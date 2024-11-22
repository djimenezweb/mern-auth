import useAuth from '@/hooks/useAuth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LogOut as LogOutIcon, EllipsisVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Profile() {
  const { user, logout } = useAuth();
  if (!user) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarFallback>{user.username[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle>{user.username}</CardTitle>
            <CardDescription className="space-x-2">
              {user.roles.map(r => (
                <span key={r}>{r}</span>
              ))}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={logout}>
                  <LogOutIcon />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
    </Card>
  );
}
