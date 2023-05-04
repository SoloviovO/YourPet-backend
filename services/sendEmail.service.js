const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY, SENDGRID_MAIL_FROM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: SENDGRID_MAIL_FROM };
  await sgMail.send(email);
};

module.exports = {
  sendEmail,
};
