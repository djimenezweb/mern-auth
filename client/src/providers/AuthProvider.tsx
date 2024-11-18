import { User } from '@/types';
import { AuthContext } from './AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { API_URL } from '@/env';
import { fetchGetOptions } from '@/config/fetchOptions';
import useEvent from '@/hooks/useEvents';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const { addEvent } = useEvent();

  const attempLogin = useCallback(async () => {
    const response = await fetch(`${API_URL}/api/auth/user`, fetchGetOptions);
    if (!response.ok) {
      addEvent('Attempt to auto login failed');
      setUser(null);
      return;
    }
    const { data, message }: { data: User; message: string } =
      await response.json();
    addEvent(message);
    setUser(data);
  }, []);

  // Attempt to login in first render from cookies
  useEffect(() => {
    attempLogin();
  }, [attempLogin]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
