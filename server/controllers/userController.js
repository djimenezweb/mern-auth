import { User } from '../models/User.js';
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

export { getUserFromCookies, getAllUsers };
