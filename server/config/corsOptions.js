export const corsOptions = {
  origin: [
    'http://localhost',
    'http://localhost:5173',
    'https://mern-auth-6hpw.onrender.com',
  ],
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  credentials: true,
  optionsSuccessStatus: 200,
};
