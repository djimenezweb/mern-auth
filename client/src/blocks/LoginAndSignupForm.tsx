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
import useAuth from '@/hooks/useAuth';
import { LoginAndSignUpForm, loginAndSignUpFormSchema } from '@/types';

type LoginAndSignupFormProps = {
  type: 'login' | 'signup';
  disabled: boolean;
};

export default function LoginAndSignupForm({
  type,
  disabled,
}: LoginAndSignupFormProps) {
  const { loginOrSignup } = useAuth();

  const form = useForm<LoginAndSignUpForm>({
    resolver: zodResolver(loginAndSignUpFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(values: LoginAndSignUpForm) {
    await loginOrSignup(type, values);
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
                    <Input
                      placeholder="Username"
                      disabled={disabled}
                      {...field}
                    />
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
                    <Input
                      placeholder="Password"
                      disabled={disabled}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              variant="default"
              className="w-full"
              type="submit"
              disabled={disabled}>
              {type === 'login' ? 'Login' : 'Signup'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

/*

async function loginOrSignUp(
  values: z.infer<typeof loginAndSignUpFormSchema>
): Promise<ApiResponse<User>> {
  const res = await fetch(`${API_URL}/api/auth/${type}`, {
    ...fetchPostOptions,
    body: JSON.stringify(values),
  });
  return await res.json();
}

async function onSubmit(values: z.infer<typeof loginAndSignUpFormSchema>) {
  try {
    const res = await loginOrSignUp(values);
    addEvent(res.message);
    if (res?.user) {
      setUser(res.user);
    }
  } catch (error) {
    if (error instanceof Error) {
      addEvent('Error: ' + error.message);
    }
  }
}
  
*/
