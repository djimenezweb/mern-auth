import { User } from '@/types';
import { createContext } from 'react';

export const AuthContext = createContext<User | null>(null);
