import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import { Loader2 } from 'lucide-react';

type LoginAndSignupFormProps = {
  type: 'login' | 'signup';
  disabled: boolean;
};

export default function LoginAndSignupForm({
  type,
  disabled,
}: LoginAndSignupFormProps) {
  const { loginOrSignup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginAndSignUpForm>({
    resolver: zodResolver(loginAndSignUpFormSchema),
    disabled: disabled || isLoading,
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(values: LoginAndSignUpForm) {
    setIsLoading(true);
    try {
      // loginOrSignup function returns a boolean
      const success = await loginOrSignup(type, values);
      if (success) {
        form.reset();
      }
    } finally {
      setIsLoading(false);
    }
  }

  const variants = {
    title: { login: 'Login', signup: 'Signup' },
    description: {
      login: 'Enter your username and password below to login',
      signup: 'Enter your username and password below to create an account',
    },
    submit: { login: 'Login', signup: 'Signup' },
  };

  return (
    <Card className={`h-full ${disabled ? 'text-muted-foreground' : ''}`}>
      <CardHeader>
        <CardTitle>{variants.title[type]}</CardTitle>
        <CardDescription>{variants.description[type]}</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
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
                  <FormControl>
                    <Input placeholder="Password" {...field} />
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
              disabled={isLoading || disabled}>
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span>Please wait</span>
                </>
              ) : (
                variants.submit[type]
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
