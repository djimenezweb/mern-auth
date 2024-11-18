import { Session } from '../models/Session.js';
import { parse } from './userAgentParser.js';

// Create a new session in database and return id
export async function createSession(userId, userAgent, ip) {
  const parsed = parse(userAgent);

  const session = await Session.create({
    userId,
    userAgent,
    userAgentName: parsed.name,
    userAgentOS: parsed.os,
    userAgentDevice: parsed.device_type,
    ip,
  });

  return session._id.toString();
}
