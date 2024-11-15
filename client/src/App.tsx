import RequireAdmin from './auth/RequireAdmin';
import RequireAuth from './auth/RequireAuth';
import { Auth, User, Events } from './blocks';
import AuthProvider from './providers/AuthProvider';
import EventProvider from './providers/EventProvider';

function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <main className="mx-auto grid grid-cols-3 grid-rows-2 max-w-7xl gap-2">
          <Events />
          <RequireAuth>
            <User />
          </RequireAuth>
          <Auth />
          <div className="col-span-3 border border-black rounded-2xl overflow-hidden">
            <RequireAuth>
              <RequireAdmin>
                <p>admin dashboard</p>
              </RequireAdmin>
            </RequireAuth>
          </div>
        </main>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;
