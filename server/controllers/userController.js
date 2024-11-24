import { User } from '../models/User.js';
import { Session } from '../models/Session.js';
import { STATUS } from '../config/status.js';

async function getUserFromCookies(req, res) {
  // Get user data from req.user (passed through validateTokens middleware)
  const { user } = req;

  // Send response
  return res.status(200).json({
    status: STATUS.SUCCESS,
    time: new Date().getTime(),
    message: `User ${user.username} logged in successfully from cookies`,
    user,
  });
}

async function getAllUsers(req, res) {
  try {
    // Find all users, exclude password and __v. Return new array with userId instead of _id.
    const users = (
      await User.find().select('-password -__v').lean().exec()
    ).map(({ _id, ...rest }) => ({ ...rest, userId: _id.toString() }));

    // If no users found, return message
    if (!users) {
      return res.status(200).json({
        status: STATUS.SUCCESS,
        time: new Date().getTime(),
        message: 'No users found',
      });
    }

    // Return all users
    return res.status(200).json({
      status: STATUS.SUCCESS,
      time: new Date().getTime(),
      message: 'Retrieved sessions successfully',
      users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: STATUS.ERROR,
      time: new Date().getTime(),
      message: 'An error ocurred',
    });
  }
}

async function updateUser(req, res) {
  const { userId } = req.params;

  try {
    // Find and update user. {new: true} to return user after update
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...req.body },
      { new: true }
    );

    // Return response
    return res.status(200).json({
      message: `Updated roles from user ${updatedUser.username}:\n${updatedUser.roles}`,
    });
  } catch (error) {
    return res.status(500).json({ message: 'An error ocurred' });
  }
}

async function deleteUser(req, res) {
  const { userId } = req.params;

  try {
    // Find and delete user
    const deletedUser = await User.findByIdAndDelete(userId);

    // If user not found, return message
    if (!deletedUser) {
      return res.status(500).json({ message: 'Could not delete user' });
    }

    // Find and delete user's sessions
    const deletedSessions = await Session.deleteMany({ userId });

    // Return response
    return res.status(200).json({
      message: `User ${deletedUser.username} deleted successfully\n${deletedSessions.deletedCount} sessions deleted successfully`,
    });
  } catch (error) {
    return res.status(500).json({ message: 'An error ocurred' });
  }
}

export { getUserFromCookies, getAllUsers, updateUser, deleteUser };
