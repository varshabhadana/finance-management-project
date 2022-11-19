require('dotenv').config();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENTID,
    process.env.CLIENTSECRET,
    'https://developers.google.com/oauthplayground',
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESHTOKEN,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject('Failed to create access token :(');
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.REACTAPPEMAIL,
      accessToken,
      clientId: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      refreshToken: process.env.REFRESHTOKEN,
    },
  });

  return transporter;
};

const sendEmail = async (emailOptions) => {
  let emailTransporter = await createTransporter();
  await emailTransporter.sendMail(emailOptions);
};

module.exports = sendEmail;
