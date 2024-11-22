import { Types } from 'mongoose';

export function validateId(id) {
  return function (req, res, next) {
    const isValid = Types.ObjectId.isValid(req.params[id]);

    if (!isValid) {
      return res.status(400).json({ message: 'Not a valid id' });
    }

    next();
  };
}
