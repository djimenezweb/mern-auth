import { Session } from '../models/Session.js';

async function getSessionsFromUserId(req, res) {
  const { userId } = req.params;
  try {
    const data = await Session.find({ userId }).select(
      'ip userAgent userAgentName userAgentOS userAgentDevice'
    );
    return res
      .status(200)
      .json({ data, message: 'Retrieved sessions successfully' });
  } catch (error) {
    return res
      .status(500)
      .json('An error ocurred while trying to get sessions');
  }
}

async function deleteSessionFromSessionId(req, res) {
  const { sessionId } = req.params;
  const { userId } = req.data;
  try {
    const session = await Session.findById(sessionId).exec();
    if (!session.userId === userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await session.deleteOne();
    const data = await Session.find({ userId }).select(
      'ip userAgent userAgentName userAgentOS userAgentDevice'
    );
    return res
      .status(200)
      .json({
        data,
        message: `Closed session from ${session.userAgentName} on ${session.userAgentOS} (${session.userAgentDevice})`,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'An error ocurred while trying to close a session' });
  }
}

export { getSessionsFromUserId, deleteSessionFromSessionId };
