import useAuth from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { API_URL } from '@/env';
import useEvent from '@/hooks/useEvents';
import { fetchGetOptions } from '@/config/fetchOptions';

export default function Logout() {
  const { user, setUser } = useAuth();
  const { addEvent } = useEvent();
  if (!user) return null;

  async function handleLogout() {
    const response = await fetch(`${API_URL}/api/auth/logout`, fetchGetOptions);
    if (!response.ok) return;
    const { message }: { message: string } = await response.json();
    addEvent(message);
    setUser(null);
  }

  return (
    <Button onClick={handleLogout} variant="destructive" className="w-full">
      Logout
    </Button>
  );
}
