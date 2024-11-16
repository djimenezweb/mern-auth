import { User } from '@/types';
import { AuthContext } from './AuthContext';
import { useState } from 'react';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const testUser: User = {
  //   userId: '63215542122451',
  //   username: 'Daniel',
  //   role: ['admin'],
  // };

  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
