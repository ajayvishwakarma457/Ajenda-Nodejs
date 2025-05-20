module.exports = async function (agenda) {
  
  // Schedule a daily email at 8 AM
//   await agenda.every('0 8 * * *', 'send email', {
//     to: 'ajayvishwakarma457@gmail.com',
//     subject: 'Daily Report',
//     text: 'Here is your daily report!',
//   });


  // Schedule a daily email at 8 AM
  await agenda.every('1 minute', 'send email', {
    to: 'ajayvishwakarma457@gmail.com',
    subject: 'Daily Report',
    text: 'Here is your daily report!',
  });

  console.log('📆 Daily email job scheduled.');
};
