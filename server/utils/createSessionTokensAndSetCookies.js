import {
  accessTokenCookiesOptions,
  refreshTokenCookiesOptions,
} from '../config/cookiesOptions.js';
import {
  createSession,
  generateAccessToken,
  generateRefreshToken,
} from './index.js';

export async function createSessionTokensAndSetCookies(user, req, res) {
  console.log('ip', req.ip);
  console.log('ips', req.ips);
  console.log('connection - remoteAdress', req.connection.remoteAddress);
  console.log('socket - remoteAdress', req.socket.remoteAddress);
  console.log('x-forwarded-for', req.headers['x-forwarded-for']);
  // const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  // Create new session
  const sessionId = await createSession(
    user._id.toString(),
    req.headers['user-agent'],
    req.ip
  );

  // Generate Access and Refresh Tokens
  const accessToken = generateAccessToken(user, sessionId);
  const refreshToken = generateRefreshToken(sessionId);

  // Set Tokens in Cookies
  res.cookie('accessToken', accessToken, accessTokenCookiesOptions);
  res.cookie('refreshToken', refreshToken, refreshTokenCookiesOptions);
}
