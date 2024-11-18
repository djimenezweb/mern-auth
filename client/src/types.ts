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

export type Session = {
  _id: string;
  userAgent: string;
  userAgentName: string;
  userAgentOS: string;
  userAgentDevice: string;
  ip: string;
};
