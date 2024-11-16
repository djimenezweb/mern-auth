import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthForm from './AuthForm';

export default function Auth() {
  return (
    <Tabs defaultValue="login">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Signup</TabsTrigger>
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
