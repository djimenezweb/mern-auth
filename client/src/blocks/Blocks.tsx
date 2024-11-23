import RequireAuth from '../auth/RequireAuth';
import { LoginAndSignup, Profile, Events, Sessions } from '../blocks';
import AdminDashboard from './AdminDashboard';

export default function Blocks() {
  return (
    <main className="py-4 mx-auto grid grid-cols-3 grid-rows-[26rem_auto] max-w-7xl gap-2">
      <Events />

      <div className="flex flex-col gap-2">
        <div className="h-auto">
          <RequireAuth>
            <Profile />
          </RequireAuth>
        </div>
        <div className="flex-1">
          <RequireAuth>
            <Sessions />
          </RequireAuth>
        </div>
      </div>

      <LoginAndSignup />

      <div className="col-span-3 overflow-hidden">
        <RequireAuth role="admin">
          <AdminDashboard />
        </RequireAuth>
      </div>
    </main>
  );
}
