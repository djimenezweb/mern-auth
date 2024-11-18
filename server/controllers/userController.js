import { User } from '../models/User.js';
import {
  hashPassword,
  comparePasswords,
  createSessionTokensAndSetCookies,
} from '../utils/index.js';
import { Session } from '../models/Session.js';

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

    // Create new Session, generate Access and Refresh Tokens, and set Cookies
    await createSessionTokensAndSetCookies(user, req, res);

    // Send Response
    return res.status(201).json({
      data: {
        userId: user._id.toString(),
        username: user.username,
        roles: user.roles,
      },
      message: `User ${user.username} created and logged in successfully`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error ocurred' });
  }
}

async function login(req, res) {
  // Get username and password from Request
  const { username, password } = req.body;

  // Send error if empty fields
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required' });
  }

  try {
    // Find user in database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(409).json({ message: 'User does not exist' });
    }

    // Compare password from database against password from login form
    const match = await comparePasswords(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // Create new Session, generate Access and Refresh Tokens, and set Cookies
    await createSessionTokensAndSetCookies(user, req, res);

    // Send Response
    return res.status(200).json({
      data: {
        userId: user._id.toString(),
        username: user.username,
        roles: user.roles,
      },
      message: `User ${user.username} logged in successfully`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error ocurred' });
  }
}

async function getUser(req, res) {
  // Get user data from req.data (passed through validateTokens middleware)
  const data = req.data;

  // Send response
  return res.status(200).json({
    data,
    message: `User ${data.username} logged in successfully from cookies`,
  });
}

async function logOut(req, res) {
  // Get sessionId from req.data (passed through validateTokens middleware)
  const { sessionId } = req.data;

  // Delete session from dataBase
  if (sessionId) {
    try {
      await Session.findByIdAndDelete(sessionId);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error ocurred' });
    }
  }

  // Clear cookies
  res.clearCookie('accessToken').clearCookie('refreshToken');

  // Send response
  return res
    .status(200)
    .json({ message: `User ${req.data.username} logged out` });
}

export { signup, login, getUser, logOut };
