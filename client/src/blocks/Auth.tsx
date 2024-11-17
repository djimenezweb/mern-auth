import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthForm from './AuthForm';
import useAuth from '@/hooks/useAuth';

export default function Auth() {
  const { user } = useAuth();

  return (
    <Tabs defaultValue="login">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger disabled={!!user} value="login">
          Login
        </TabsTrigger>
        <TabsTrigger disabled={!!user} value="signup">
          Signup
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <AuthForm type="login" />
      </TabsContent>
      <TabsContent value="signup">
        <AuthForm type="signup" />
      </TabsContent>
    </Tabs>
  );
}
