import useAuth from '@/hooks/useAuth';
import RequireAuth from '../auth/RequireAuth';
import { LoginAndSignup, Profile, Events, Sessions } from '../blocks';
import AdminDashboard from './AdminDashboard';

export default function Blocks() {
  const { user } = useAuth();

  return (
    <main className="p-4 space-y-2 sm:space-y-0 mx-auto block sm:grid sm:grid-cols-3 sm:grid-rows-[24rem_auto] max-w-7xl sm:gap-2">
      <Events />

      <div
        className={`${
          !user ? 'hidden sm:flex' : ''
        } max-h-full flex flex-col gap-2`}>
        <div className="h-auto">
          <RequireAuth>
            <Profile />
          </RequireAuth>
        </div>
        <div className="flex-1 overflow-hidden">
          <RequireAuth>
            <Sessions />
          </RequireAuth>
        </div>
      </div>

      <div className={`${user ? 'hidden sm:block' : ''}`}>
        <LoginAndSignup />
      </div>

      <div className="col-span-3 overflow-hidden">
        <RequireAuth role="admin">
          <AdminDashboard />
        </RequireAuth>
      </div>
    </main>
  );
}
