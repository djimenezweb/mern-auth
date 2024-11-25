import jwt from 'jsonwebtoken';
import { Session } from '../models/Session.js';
import { User } from '../models/User.js';
import { generateAccessToken, generateRefreshToken } from '../utils/index.js';
import {
  accessTokenCookiesOptions,
  refreshTokenCookiesOptions,
} from '../config/cookiesOptions.js';
import { STATUS } from '../config/status.js';

if (typeof process.env.ACCESS_TOKEN_SECRET === 'undefined') {
  throw new Error('Environment variable ACCESS_TOKEN_SECRET is undefined');
}

if (typeof process.env.REFRESH_TOKEN_SECRET === 'undefined') {
  throw new Error('Environment variable REFRESH_TOKEN_SECRET is undefined');
}

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

export async function validateTokens(req, res, next) {
  // Get Access and Refresh Tokens from cookies
  const { accessToken, refreshToken } = req.cookies;

  // If no Refresh Token, send unauthorized error
  if (!refreshToken) {
    return res.status(401).json({
      status: STATUS.ERROR,
      time: new Date().getTime(),
      message: 'No Refresh Token found. Please log in to continue',
    });
  }

  // If no Access Token, decode Refresh Token
  if (refreshToken && !accessToken) {
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({
          status: STATUS.ERROR,
          time: new Date().getTime(),
          message: 'Invalid Refresh Token. Please log in to continue',
        });
      }

      // Look up session
      const { sessionId } = decoded;
      const session = await Session.findById(sessionId).lean().exec();

      // If no session found
      if (!session || !session.valid) {
        // Clear cookies and send 403 error
        res.clearCookie('accessToken').clearCookie('refreshToken');
        return res.status(403).json({
          status: STATUS.ERROR,
          time: new Date().getTime(),
          message: 'Session not found. Please log in to continue',
        });
      }

      // If session is not valid
      if (!session.valid) {
        return res.status(403).json({
          status: STATUS.ERROR,
          time: new Date().getTime(),
          message: 'Invalid session',
        });
      }

      // If session is valid find user
      const userId = session.userId;
      const user = await User.findById(userId).lean().exec();

      // Refresh both tokens
      const newAccessToken = generateAccessToken(user, sessionId);
      const newRefreshToken = generateRefreshToken(sessionId);

      // Set Tokens in Cookies
      res.cookie('accessToken', newAccessToken, accessTokenCookiesOptions);
      res.cookie('refreshToken', newRefreshToken, refreshTokenCookiesOptions);

      // Make user data available to further methods as req.user
      req.user = {
        userId,
        roles: user.roles,
        username: user.username,
        sessionId,
      };

      next();
    });
  }

  // If Access Token check its validity
  if (accessToken) {
    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, decodedUser) => {
      if (err) {
        return res.status(403).json({
          status: STATUS.ERROR,
          time: new Date().getTime(),
          message: 'Invalid Access Token',
        });
      }

      // Isolate iat
      const { iat, ...rest } = decodedUser;

      // Make decodedUser available to further methods as req.user
      req.user = { ...rest };

      next();
    });
  }
}
