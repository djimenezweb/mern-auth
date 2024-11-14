import bcrypt from 'bcrypt';

const saltRounds = 10;

async function hashPassword(password) {
  return bcrypt.hash(password, saltRounds);
}

async function comparePasswords(x, y) {
  return bcrypt.compare(x, y);
}

export { hashPassword, comparePasswords };
