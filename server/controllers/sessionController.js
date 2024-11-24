import { STATUS } from '../config/status.js';
import { Session } from '../models/Session.js';

async function getSessionsFromUserId(req, res) {
  const { userId } = req.params;
  try {
    // Clean up possibly expired sessions from user
    const now = new Date().getTime();
    const expiredSessions = await Session.deleteMany({
      userId,
      expires: { $lt: now },
    });

    // Get remaining sessions from userId
    const sessions = await Session.find({ userId })
      .select('-userId -updatedAt -createdAt -__v')
      .lean()
      .exec();

    // Return response
    return res.status(200).json({
      status: STATUS.SUCCESS,
      time: new Date().getTime(),
      message: `Retrieved sessions successfully\n${expiredSessions.deletedCount} expired sessions removed`,
      sessions,
    });
  } catch (error) {
    return res.status(500).json({
      status: STATUS.ERROR,
      time: new Date().getTime(),
      message: 'An error ocurred while trying to get sessions',
    });
  }
}

async function deleteSessionFromSessionId(req, res) {
  const { sessionId } = req.params;
  const { userId } = req.user;
  const isAdmin = req.user.roles.includes('admin');

  try {
    // Find session
    const sessionToDelete = await Session.findById(sessionId).exec();

    // Grant access to admins only or session owners
    if (!isAdmin || !sessionToDelete.userId === userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Delete the session
    await sessionToDelete.deleteOne();

    // If deleting current session, clear cookies
    if (sessionId === req.user.sessionId) {
      res
        .clearCookie('accessToken', cookiesOptions)
        .clearCookie('refreshToken', cookiesOptions);
    }

    // Return response
    return res.status(200).json({
      status: STATUS.SUCCESS,
      time: new Date().getTime(),
      message: `Closed session from ${sessionToDelete.userAgentName} on ${sessionToDelete.userAgentOS} (${sessionToDelete.userAgentDevice})`,
    });
  } catch (error) {
    return res.status(500).json({
      status: STATUS.ERROR,
      time: new Date().getTime(),
      message: 'An error ocurred while trying to close a session',
    });
  }
}

export { getSessionsFromUserId, deleteSessionFromSessionId };
