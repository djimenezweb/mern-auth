import { Blocks } from './blocks';
import AuthProvider from './providers/AuthProvider';
import EventProvider from './providers/EventProvider';

function App() {
  return (
    <EventProvider>
      <AuthProvider>
        <Blocks />
      </AuthProvider>
    </EventProvider>
  );
}

export default App;
