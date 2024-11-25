import { ApiResponse, LoginAndSignUpForm, User } from '@/types';
import { AuthContext } from './AuthContext';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useEvent from '@/hooks/useEvent';
import { API_URL } from '@/env';
import { fetchGetOptions, fetchPostOptions } from '@/config/fetchOptions';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const { addEvent } = useEvent();

  // Login or Signup function, used in <LoginAndSignupForm>.
  // Returns true if request is successful (res.ok), returns false otherwise.
  const loginOrSignup = useCallback(
    async (type: 'login' | 'signup', values: LoginAndSignUpForm) => {
      try {
        const response = await fetch(`${API_URL}/api/auth/${type}`, {
          ...fetchPostOptions,
          body: JSON.stringify(values),
        });
        const data = (await response.json()) as ApiResponse<User>;
        addEvent(data.message, data.time);
        if (data?.user) {
          setUser(data.user);
        }
        if (response.ok) {
          return true;
        }
      } catch (error) {
        if (error instanceof Error) {
          addEvent(error.message);
        }
      }
      return false;
    },
    []
  );

  // Logout function, used in <Profile>
  const logout = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/logout`, {
        ...fetchGetOptions,
      });
      if (response.ok) {
        const data = (await response.json()) as ApiResponse;
        setUser(null);
        addEvent(data.message, data.time);
      }
    } catch (err) {
      if (err instanceof Error) {
        addEvent(err.message);
      }
    }
  }, []);

  // Attempt to login in first render from tokens stored in cookies
  useEffect(() => {
    let ignore = false;

    async function attempLogin() {
      try {
        const response = await fetch(
          `${API_URL}/api/users/me`,
          fetchGetOptions
        );
        const data = (await response.json()) as ApiResponse<User>;
        if (!ignore && data.message) {
          addEvent(data.message, data.time);
        }
        if (!ignore && data.user) {
          setUser(data.user);
        }
      } catch (error) {
        if (!ignore) {
          addEvent('Please login to continue');
        }
      }
    }

    attempLogin();

    return () => {
      ignore = true;
    };
  }, [addEvent]);

  const value = useMemo(() => {
    return { user, setUser, logout, loginOrSignup };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
