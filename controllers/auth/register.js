const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { uuid } = require("uuid");

const { User } = require("../../models/user");
const { sendEmail, createVerifyEmail, RequestError } = require("../../helpers");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = uuid();
  const avatarURL = gravatar.url(email);

  const result = await User.create({
    password: hashPassword,
    email,
    subscription,
    avatarURL,
    verificationToken,
  });

  const mail = createVerifyEmail(email, verificationToken);

  await sendEmail(mail);

  res.status(201).json({
    password: result.password,
    email: result.email,
    subscription: result.subscription,
  });
};

module.exports = register;
