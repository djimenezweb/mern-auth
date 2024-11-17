import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { API_URL } from '@/env';
import useAuth from '@/hooks/useAuth';
import { User } from '@/types';
import useEvent from '@/hooks/useEvents';

const formSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'Username is required' })
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(30, { message: 'Must be 30 or fewer characters long' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(4, { message: 'Must be 4 or more characters long' })
    .max(30, { message: 'Must be 30 or fewer characters long' }),
});

export default function AuthForm({ type }: { type: 'login' | 'signup' }) {
  const { setUser } = useAuth();
  const { addEvent } = useEvent();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(`${API_URL}/api/auth/${type}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        setUser(null);
        console.log('handle error');
      }

      const { data, message }: { data: User; message: string } =
        await response.json();
      setUser(data);
      addEvent(message);
    } catch (error) {
      console.error(`AuthForm ${type} onSubmit error`, error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{type === 'login' ? 'Login' : 'Signup'}</CardTitle>
        <CardDescription>
          {type === 'login'
            ? 'Enter your username and password below to login'
            : 'Enter your username and password below to create an account'}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button variant="default" className="w-full" type="submit">
              {type === 'login' ? 'Login' : 'Signup'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
