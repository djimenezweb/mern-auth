type Role = 'user' | 'admin';

export type User = {
  userId: string;
  username: string;
  role: Role[];
};

export type Event = {
  message: string;
};
