import {
  Routes,
  Route,
  // Link,
  // useNavigate,
  // useLocation,
  // Navigate,
  // Outlet,
} from 'react-router-dom';
import {
  Layout,
  PublicPage,
  LoginPage,
  ProtectedPage,
  AdminPage,
  SignupPage,
} from './pages';
import RequireAuth from './router/RequireAuth';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PublicPage />} />
          <Route
            path="/protected"
            element={
              <RequireAuth>
                <ProtectedPage />
              </RequireAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminPage />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  );
}

export default App;
