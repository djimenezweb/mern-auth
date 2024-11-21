import { User } from '@/types';
import { createContext } from 'react';

type AuthContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthContext | null>(null);
