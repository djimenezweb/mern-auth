import { User } from '@/types';
import { AuthContext } from './AuthContext';
import { useCallback, useEffect, useMemo, useState } from 'react';
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

  const logout = useCallback(async () => {
    const response = await fetch(`${API_URL}/api/auth/logout`, fetchGetOptions);
    if (!response.ok) return;
    const { message }: { message: string } = await response.json();
    addEvent(message);
    setUser(null);
  }, [addEvent]);

  // Attempt to login in first render from cookies
  useEffect(() => {
    let ignore = false;

    async function attempLogin() {
      const response = await fetch(`${API_URL}/api/auth/user`, fetchGetOptions);
      if (!response.ok) {
        if (!ignore) {
          addEvent('Attempt to auto login failed');
          setUser(null);
        }
        return;
      }
      const { data, message }: { data: User; message: string } =
        await response.json();
      if (!ignore) {
        addEvent(message);
        setUser(data);
      }
    }

    attempLogin();

    return () => {
      ignore = true;
    };
  }, [addEvent]);

  const value = useMemo(() => {
    return { user, setUser, logout };
  }, [user, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
