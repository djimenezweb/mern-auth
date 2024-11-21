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
