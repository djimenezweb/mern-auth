import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthForm from './LoginAndSignupForm';
import useAuth from '@/hooks/useAuth';

export default function LoginAndSignup() {
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
        <AuthForm type="login" disabled={!!user} />
      </TabsContent>
      <TabsContent value="signup">
        <AuthForm type="signup" disabled={!!user} />
      </TabsContent>
    </Tabs>
  );
}
