import RequireAuth from '../auth/RequireAuth';
import { LoginAndSignup, Profile, Events, Sessions } from '../blocks';

export default function Blocks() {
  return (
    <main className="py-4 mx-auto grid grid-cols-3 grid-rows-2 max-w-7xl gap-2">
      <Events />

      <div className="flex flex-col gap-2">
        <RequireAuth>
          <Profile />
        </RequireAuth>
        <RequireAuth>
          <Sessions />
        </RequireAuth>
      </div>

      <LoginAndSignup />

      <div className="col-span-3 border border-black rounded-2xl overflow-hidden">
        <RequireAuth role="admin">
          <p>admin dashboard</p>
        </RequireAuth>
      </div>
    </main>
  );
}
