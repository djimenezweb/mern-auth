import { refreshTokenExpiration } from '../config/expireOptions.js';
import { Session } from '../models/Session.js';
import { parse } from './userAgentParser.js';

// Create a new session in database and return id
export async function createSession(userId, userAgent, ip) {
  // Parse User Agent
  const parsedUserAgent = parse(userAgent);

  // Expire date in ms
  const expires = new Date().getTime() + refreshTokenExpiration * 1000;

  // Save new session in db
  const session = await Session.create({
    userId,
    userAgent,
    userAgentName: parsedUserAgent.name,
    userAgentOS: parsedUserAgent.os,
    userAgentDevice: parsedUserAgent.device_type,
    ip,
    expires,
  });

  return session._id.toString();
}
