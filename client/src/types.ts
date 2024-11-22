import { z } from 'zod';

export type Event = {
  time: string;
  message: string;
};

export type Role = 'user' | 'admin';

export type User = {
  userId: string;
  username: string;
  roles: Role[];
};

export type Session = {
  _id: string;
  userAgent: string;
  userAgentName: string;
  userAgentOS: string;
  userAgentDevice: string;
  ip: string;
};

export type ApiResponse<Type = void> = {
  status: 'success' | 'error';
  time: number;
  message: string;
  user?: Type extends User ? User : never;
  users?: Type extends User[] ? User[] : never;
  session?: Type extends Session ? Session : never;
  sessions?: Type extends Session[] ? Session[] : never;
};

export const loginAndSignUpFormSchema = z.object({
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

export type LoginAndSignUpForm = z.infer<typeof loginAndSignUpFormSchema>;
