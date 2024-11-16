import { AuthContext } from '@/providers/AuthContext';
import { useContext } from 'react';

export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a Provider');
  }
  return context;
}
