const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const mail = {
    ...data,
    from: "tanja.karamilja@gmail.com",
    to: "tatyana.syrbu@meta.ua",
  };
  await sgMail.send(mail);
  return true;
};

module.exports = sendEmail;
