const cron = require('node-cron');
const express = require('express');
const sendEmail = require('./mail');
const fetch = require('node-fetch');

// Create an instance of Express
app = express();

const fetchUsersWithNotification = async () => {
  const response = await fetch(
    'https://finance-management-project.fly.dev/api/users',

    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    },
  );
  const data = await response.json();

  return data;
};
// email scheduled for all the user subscribed for notification
cron.schedule('* * * * *', async () => {
  console.log('Tasked scheduled with 1 minute interval');
  const usersWithMailSubscription = await fetchUsersWithNotification();

  const filterdata = usersWithMailSubscription.users;
  filterdata.forEach((el) => {
    sendEmail({
      subject: 'Reminder',
      text: 'I am sending an email from nodemailer!',
      html: `<b>Hey there ${el.firstName}! </b><p> This is a reminder to fill your income and expenses of the day<p/>`,
      to: el.email,
      from: process.env.REACTAPPEMAIL,
    });
  });
});

app.listen(4000);
