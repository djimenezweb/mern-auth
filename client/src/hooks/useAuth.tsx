import { AuthContext } from '@/providers/AuthContext';
import { useContext } from 'react';

export default function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
