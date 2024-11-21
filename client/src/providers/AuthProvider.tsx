import { ApiResponse, User } from '@/types';
import { AuthContext } from './AuthContext';
import { useEffect, useMemo, useState } from 'react';
import useEvent from '@/hooks/useEvent';
import { API_URL } from '@/env';
import { fetchGetOptions } from '@/config/fetchOptions';

async function getUserFromCookies(): Promise<ApiResponse<User>> {
  const res = await fetch(`${API_URL}/api/users/me`, fetchGetOptions);
  return res.json();
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const { addEvent } = useEvent();

  // Attempt to login in first render from tokens stored in cookies
  useEffect(() => {
    let ignore = false;

    async function attempLogin() {
      try {
        const response = await getUserFromCookies();
        if (!ignore && response.message) {
          addEvent(response.message, response.time);
        }
        if (!ignore && response.user) {
          setUser(response.user);
        }
      } catch (error) {
        console.error(error);
        if (!ignore) {
          addEvent('Attempt to auto login failed');
        }
      }
    }

    attempLogin();

    return () => {
      ignore = true;
    };
  }, [addEvent]);

  const value = useMemo(() => {
    return { user, setUser };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// const logout = useCallback(async () => {
//   const response = await fetch(`${API_URL}/api/auth/logout`, fetchGetOptions);
//   if (!response.ok) return;
//   const { message }: { message: string } = await response.json();
//   addEvent(message);
//   setUser(null);
// }, [addEvent]);
