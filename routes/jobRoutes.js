//jobRoutes.js
const express = require('express');
const router = express.Router();
const agenda = require('../agenda/agendaInstance');

// Trigger immediate hello
router.post('/hello', async (req, res) => {
  await agenda.now('say hello');
  res.send('Job "say hello" scheduled.');
});

// Trigger delayed greet user
router.post('/greet', async (req, res) => {
  const { name } = req.body;
  await agenda.schedule('in 1 minute', 'greet user', { name });
  res.send(`Job "greet user" scheduled for ${name}.`);
});

// Cancel jobs
router.delete('/cancel/:name', async (req, res) => {
  const jobName = req.params.name;
  const result = await agenda.cancel({ name: jobName });
  res.send(`Cancelled ${result} job(s) with name "${jobName}".`);
});

router.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;
  await agenda.now('send email', { to, subject, text });
  res.send(`📬 Email job scheduled to: ${to}`);
});

// Send SMS job
router.post('/send-sms', async (req, res) => {
  const { to, message } = req.body;
  await agenda.now('send sms', { to, message });
  res.send(`📲 SMS job scheduled to: ${to}`);
});

// Chained Job: Fetch user → send welcome email
router.post('/onboard-user', async (req, res) => {
  const { userId } = req.body;
  await agenda.now('fetch user data', { userId });
  res.send(`🔗 Chained jobs scheduled for userId: ${userId}`);
});

router.post('/high-priority', async (req, res) => {
  await agenda.now('high priority task');
  res.send('🚀 High priority job scheduled');
});

module.exports = router;
