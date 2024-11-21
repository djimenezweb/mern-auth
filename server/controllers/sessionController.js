import { STATUS } from '../config/status.js';
import { Session } from '../models/Session.js';

async function getSessionsFromUserId(req, res) {
  const { userId } = req.params;
  try {
    const sessions = await Session.find({ userId }).select(
      'ip userAgent userAgentName userAgentOS userAgentDevice'
    );
    return res.status(200).json({
      status: STATUS.SUCCESS,
      time: new Date().getTime(),
      message: 'Retrieved sessions successfully',
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
  try {
    const session = await Session.findById(sessionId).exec();
    if (!session.userId === userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await session.deleteOne();
    // const sessions = await Session.find({ userId }).select(
    //   'ip userAgent userAgentName userAgentOS userAgentDevice'
    // );
    return res.status(200).json({
      status: STATUS.SUCCESS,
      time: new Date().getTime(),
      message: `Closed session from ${session.userAgentName} on ${session.userAgentOS} (${session.userAgentDevice})`,
      // sessions,
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
