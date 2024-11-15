# MERN Auth

## 🚧 Work in progress! 🚧

Basic auth system with role- and session-based authorization.

## Back-End

- Express
- Refresh and Access Tokens (JWT)
- Hashed passwords (bcrypt)
- HttpOnly Cookies (cookie-parser)
- MongoDB & Mongoose

## Front-End

- Vite + React + TypeScript
- Shadcn/ui
- Tailwind CSS

## Sample code

```javascript
async function signup(req, res) {
  // Get username and password from Request
  const { username, password } = req.body;

  // Send error if empty fields
  if (!username || !password) {
    return res
      .status(409)
      .json({ message: 'Username and password are required' });
  }

  try {
    // Check if username already exists to prevent duplicates
    const duplicate = await User.findOne({ username });
    if (duplicate) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Save username and hashed password to database
    const user = await User.create({ username, password: hashedPassword });
    const userId = user._id.toString();

    // Create new session and save it to database
    const session = await Session.create({
      userId,
      valid: true,
      userAgent: req.headers['user-agent'],
      ip: req.ip,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
    const sessionId = session._id.toString();

    // Generate Access and Refresh Tokens
    const accessToken = generateAccessToken(userId, sessionId);
    const refreshToken = generateRefreshToken(sessionId);

    // Send Cookies
    res.cookie('accessToken', accessToken, cookiesOptions);
    res.cookie('refreshToken', refreshToken, cookiesOptions);

    // Send Response
    return res.status(201).json({ message: 'User created' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error ocurred' });
  }
}
```
