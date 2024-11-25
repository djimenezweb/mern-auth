import { User } from '../models/User.js';
import {
  hashPassword,
  comparePasswords,
  createSessionTokensAndSetCookies,
} from '../utils/index.js';
import { Session } from '../models/Session.js';
import { STATUS } from '../config/status.js';
import { cookiesOptions } from '../config/cookiesOptions.js';

async function signup(req, res) {
  // Get username and password from Request
  const { password } = req.body;
  const username = req.body.username.trim();

  // Send error if empty fields
  if (!username || !password) {
    return res.status(409).json({
      status: STATUS.ERROR,
      time: new Date().getTime(),
      message: 'Username and password are required',
    });
  }

  try {
    // Check if username already exists to prevent duplicates
    const duplicate = await User.findOne({ username }).lean().exec();
    if (duplicate) {
      return res.status(409).json({
        status: STATUS.ERROR,
        time: new Date().getTime(),
        message: 'Username already exists',
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Save username and hashed password to database
    const user = await User.create({
      username,
      password: hashedPassword,
    });

    // Create new Session, generate Access and Refresh Tokens, and set Cookies
    await createSessionTokensAndSetCookies(user, req, res);

    // Send Response
    return res.status(201).json({
      status: STATUS.SUCCESS,
      time: new Date().getTime(),
      message: `User ${user.username} created and logged in successfully`,
      user: {
        userId: user._id.toString(),
        username: user.username,
        roles: user.roles,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: STATUS.ERROR,
      time: new Date().getTime(),
      message: 'An error ocurred',
    });
  }
}

async function login(req, res) {
  // Get username and password from Request
  const { password } = req.body;
  const username = req.body.username.trim();

  // Send error if empty fields
  if (!username || !password) {
    return res.status(400).json({
      status: STATUS.ERROR,
      time: new Date().getTime(),
      message: 'Username and password are required',
    });
  }

  try {
    // Find user in database
    const user = await User.findOne({ username }).lean().exec();
    if (!user) {
      return res.status(409).json({
        status: STATUS.ERROR,
        time: new Date().getTime(),
        message: 'User does not exist',
      });
    }

    // Compare password from database against password from login form
    const match = await comparePasswords(password, user.password);
    if (!match) {
      return res.status(400).json({
        status: STATUS.ERROR,
        time: new Date().getTime(),
        message: 'Incorrect password',
      });
    }

    // Create new Session, generate Access and Refresh Tokens, and set Cookies
    await createSessionTokensAndSetCookies(user, req, res);

    // Send Response
    return res.status(200).json({
      status: STATUS.SUCCESS,
      time: new Date().getTime(),
      message: `User ${user.username} logged in successfully`,
      user: {
        userId: user._id.toString(),
        username: user.username,
        roles: user.roles,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: STATUS.ERROR,
      time: new Date().getTime(),
      message: 'An error ocurred',
    });
  }
}

async function logOut(req, res) {
  // Get sessionId from req.user (passed through validateTokens middleware)
  const { sessionId } = req.user;

  // Find session and delete it from database
  if (sessionId) {
    try {
      await Session.findByIdAndDelete(sessionId).exec();
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: STATUS.ERROR,
        time: new Date().getTime(),
        message: 'An error ocurred',
      });
    }
  }

  // Clear cookies
  res
    .clearCookie('accessToken', cookiesOptions)
    .clearCookie('refreshToken', cookiesOptions);

  // Send response
  return res.status(200).json({
    status: STATUS.SUCCESS,
    time: new Date().getTime(),
    message: `User ${req.user.username} logged out`,
  });
}

export { signup, login, logOut };
