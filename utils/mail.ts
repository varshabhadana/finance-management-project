const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',

  auth: { user: process.env.REACT_APP_EMAIL, pass: process.env.REACT_APP_PASS },
});

let mailOptions = {
  from: 'financemanagementproject2022@gmail.com',
  to: 'varshabhadana93@gmail.com',
  subject: 'Daily Remider',
  text: 'Plaintext version of the message',
  html: '<p>HTML version of the message</p>',
};

export default function () {
  transporter.sendMail(mailOptions, function (err: any, info: any) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
}
