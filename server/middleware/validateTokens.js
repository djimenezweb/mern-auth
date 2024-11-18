import jwt from 'jsonwebtoken';
import { Session } from '../models/Session.js';
import { User } from '../models/User.js';
import { generateAccessToken, generateRefreshToken } from '../utils/index.js';
import { cookiesOptions } from '../config/cookiesOptions.js';
import { refreshTokenExpiration } from '../config/expireOptions.js';

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
    return res
      .status(401)
      .json({ message: 'No Refresh Token, please log in to continue' });
  }

  // If no Access Token, decode Refresh Token
  if (refreshToken && !accessToken) {
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid Refresh Token' });
      }

      // Look up session
      const { sessionId } = decoded;
      const session = await Session.findById(sessionId);

      // If no session found or session is not valid
      if (!session || !session.valid) {
        // Clear cookies and send 403 error
        res.clearCookie('accessToken').clearCookie('refreshToken');
        return res.status(403).json({ message: 'Invalid session' });
      }

      // If session is valid find user
      const userId = session.userId;
      const user = await User.findById(userId);

      // Refresh both tokens
      const newAccessToken = generateAccessToken(user, sessionId);
      const newRefreshToken = generateRefreshToken(sessionId);

      // Set Tokens in Cookies
      res.cookie('accessToken', newAccessToken, cookiesOptions);
      res.cookie('refreshToken', newRefreshToken, {
        ...cookiesOptions,
        maxAge: refreshTokenExpiration * 1000,
      });

      // Make data available to further methods as req.data
      req.data = {
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
    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid Access Token' });
      }
      // decoded = { userId: '123', roles: ['user', 'admin'], sessionId: '123', iat: 123 }

      // Remove iat
      if ('iat' in decoded) {
        delete decoded.iat;
      }

      // Make decoded available to further methods as req.data
      req.data = decoded;

      next();
    });
  }
}
