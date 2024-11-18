import jwt from 'jsonwebtoken';
import { refreshTokenExpiration } from '../config/expireOptions.js';

if (typeof process.env.ACCESS_TOKEN_SECRET === 'undefined') {
  throw new Error('Environment variable ACCESS_TOKEN_SECRET is undefined');
}

if (typeof process.env.REFRESH_TOKEN_SECRET === 'undefined') {
  throw new Error('Environment variable REFRESH_TOKEN_SECRET is undefined');
}

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

function generateAccessToken(user, sessionId) {
  const { _id, roles, username } = user;
  const token = jwt.sign(
    { userId: _id.toString(), roles, username, sessionId },
    ACCESS_TOKEN_SECRET
  );
  return token;
}

function generateRefreshToken(sessionId) {
  const token = jwt.sign({ sessionId }, REFRESH_TOKEN_SECRET, {
    expiresIn: refreshTokenExpiration,
  });
  return token;
}

export { generateAccessToken, generateRefreshToken };
