import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthForm from './LoginAndSignupForm';
import useAuth from '@/hooks/useAuth';

export default function LoginAndSignup() {
  const { user } = useAuth();

  return (
    <Tabs defaultValue="login" className="flex flex-col gap-2">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger disabled={!!user} value="login">
          Login
        </TabsTrigger>
        <TabsTrigger disabled={!!user} value="signup">
          Signup
        </TabsTrigger>
      </TabsList>
      <div className="flex-1">
        <TabsContent className="mt-0 h-full" value="login">
          <AuthForm type="login" disabled={!!user} />
        </TabsContent>
        <TabsContent className="mt-0 h-full" value="signup">
          <AuthForm type="signup" disabled={!!user} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
