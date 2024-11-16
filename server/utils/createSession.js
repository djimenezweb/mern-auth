import { Session } from '../models/Session.js';

// Create a new session in database and return id
export async function createSession(
  userId,
  userAgent = 'unknown',
  ip = 'unknown'
) {
  const session = await Session.create({
    userId,
    userAgent,
    ip,
  });

  return session._id.toString();
}
