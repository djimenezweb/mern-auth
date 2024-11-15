import { User } from '@/types';
import { AuthContext } from './AuthContext';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const user: User = {
    userId: '63215542122451',
    username: 'Daniel',
    role: ['admin'],
  };

  // const user = null;

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
