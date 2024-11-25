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
