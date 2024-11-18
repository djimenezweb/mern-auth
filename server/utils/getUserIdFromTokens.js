import jwt from 'jsonwebtoken';
import { Session } from '../models/Session.js';
import { cookiesOptions } from '../config/cookiesOptions.js';
import { generateAccessToken, generateRefreshToken } from './generateTokens.js';

// BORRAR ARCHIVO ????????

// export
async function getUserIdFromTokens(accessToken, refreshToken, res) {
  // If no Access Token, get and return userId from Refresh Token
  if (!accessToken) return getUserIdFromRefreshToken(refreshToken, res);

  // If Access Token, get from decoded Access Token
  const userId = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decodedToken) => {
      if (err) return res.status(403).json({ message: 'Invalid Access Token' });
      return decodedToken.userId;
    }
  );

  // Return userId
  return userId;
}

function getSessionIdFromRefreshToken(refreshToken, res) {
  // Get sessionId from decoded Refresh Token
  const sessionId = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decodedToken) => {
      if (err)
        return res.status(403).json({ message: 'Invalid Refresh Token' });
      return decodedToken.sessionId;
    }
  );

  // Return sessionId
  return sessionId;
}

async function getUserIdFromRefreshToken(refreshToken, res) {
  // Get sessionId
  const sessionId = getSessionIdFromRefreshToken(refreshToken, res);

  // Find session and get userId
  try {
    const session = await Session.findById(sessionId);
    // Check session validity, if not valid return error
    if (!session.valid)
      return res.status(403).json({ message: 'Invalid session' });
    // If session is valid create new Access and Refresh Tokens
    const accessToken = generateAccessToken(userId, sessionId);
    const refreshToken = generateRefreshToken(sessionId);

    // Set Tokens in Cookies
    res.cookie('accessToken', accessToken, cookiesOptions);
    res.cookie('refreshToken', refreshToken, cookiesOptions);

    // Return userId
    return session.userId;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error ocurred' });
  }
}
