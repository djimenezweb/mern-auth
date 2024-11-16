type Role = 'user' | 'admin';

export type User = {
  userId: string;
  username: string;
  roles: Role[];
};

export type Event = {
  time: string;
  message: string;
};
