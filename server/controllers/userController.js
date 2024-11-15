import { User } from '../models/User.js';
import { Session } from '../models/Session.js';
import { hashPassword, comparePasswords } from '../utils/bcrypt.js';
import { generateAccessToken, generateRefreshToken } from '../utils/tokens.js';
import { cookiesOptions } from '../config/cookiesOptions.js';

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

async function login(req, res) {
  // Get username and password from Request
  const { username, password } = req.body;

  // Send error if empty fields
  if (!username || !password) {
    return res
      .status(409)
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
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Send Response
    return res
      .status(202)
      .json({ message: `User ${user.username} logged in successfully` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error ocurred' });
  }
}

export { signup, login };
