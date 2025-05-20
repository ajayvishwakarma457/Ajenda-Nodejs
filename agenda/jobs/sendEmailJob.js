const nodemailer = require('nodemailer');

module.exports = (agenda) => {
  agenda.define('send email', async (job, done) => {
    const { to, subject, text } = job.attrs.data;

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: `"Your App" ${process.env.EMAIL_PASSWORD}`,
        to,
        subject,
        text,
      });

      console.log(`✅ Email sent to ${to}`);
      done();
    } catch (err) {
      const attempts = job.attrs.failCount || 0;
      console.error(`❌ Attempt ${attempts + 1} failed to send email to ${to}:`, err.message);

      // Retry logic: max 3 attempts with delay
      if (attempts < 2) {
        const delayInMs = 2 * 60 * 1000; // Retry after 2 minutes
        await agenda.schedule(new Date(Date.now() + delayInMs), 'send email', { to, subject, text });
        console.log(`🔁 Retrying to send email to ${to} in 2 minutes...`);
      }

      done(err); // Mark current attempt as failed
    }
  });
};
