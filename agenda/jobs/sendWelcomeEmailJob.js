const nodemailer = require('nodemailer');

module.exports = (agenda) => {
  agenda.define('send welcome email', async (job, done) => {
    const { email, name } = job.attrs.data;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Your App" ${process.env.EMAIL_PASSWORD}`,
      to: email,
      subject: '🎉 Welcome!',
      text: `Hello ${name}, welcome to our platform!`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${email}`);
    done();
  });
};
