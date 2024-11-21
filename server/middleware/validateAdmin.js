import { STATUS } from '../config/status.js';

export async function validateAdmin(req, res, next) {
  const isAdmin = req.user.roles.includes('admin');

  if (!isAdmin) {
    return res.status(403).json({
      status: STATUS.ERROR,
      time: new Date().getTime(),
      message: 'Unauthorized: admins only',
    });
  }

  next();
}
