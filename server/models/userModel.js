const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const validator = require('validator');

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Static signup method
// Esta opción se explica en la lección 3 del tutorial de MERN Auth
// Se trata de hacer una función que esté integrada en el modelo, en lugar de desarrollarla en el Controller.
// Como en la misma función debemos hacer uso de un modelo que todavía no hemos exportado, ponemos this en lugar del nombre del modelo.
// Y como se usa this no puede ser una arrow function

userSchema.statics.signup = async function (email, password) {
  // const exists = this.exists({ email: email });

  // Validation
  if (!email || !password) {
    throw Error('All fields must be filled');
  }

  if (!validator.isEmail(email)) {
    throw Error('Email is not valid');
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough');
  }

  // if (exists._id) {
  //   throw Error('Email already in use');
  // }

  // Encriptación de contraseña
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Enviar usuario y contraseña a db
  const user = await this.create({ email, password: hash });

  return user;
};

// Static login method

userSchema.statics.login = async function (email, password) {
  // Validation
  if (!email || !password) {
    throw Error('All fields must be filled');
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Email doesn't exist");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
