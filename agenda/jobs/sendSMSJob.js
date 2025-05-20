const twilio = require('twilio');

module.exports = (agenda) => {
  agenda.define('send sms', async (job, done) => {
    const { to, message } = job.attrs.data;

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromPhone = process.env.TWILIO_FROM_PHONE

    const client = twilio(accountSid, authToken);

    try {
      const res = await client.messages.create({
        body: message,
        from: fromPhone,
        to: to,
      });

      console.log(`📲 SMS sent to ${to}: SID=${res.sid}`);
      done();
    } catch (err) {
      console.error('❌ SMS sending failed:', err.message);
      done(err);
    }
  });
};
