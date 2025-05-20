const express = require('express');
const agenda = require('./agenda/agendaInstance');
const Agendash = require('agendash');
const basicAuth = require('express-basic-auth');
const mongoose = require('mongoose');


const jobRoutes = require('./routes/jobRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const setupRecurringJobs = require('./agenda/jobs/recurringJobs');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/dashboard', dashboardRoutes);

app.use('/dash',
  basicAuth({
    users: { admin: '12345' },
    challenge: true,
  }),
  Agendash(agenda)
);
// app.use('/dash', Agendash(agenda));
app.use('/jobs', jobRoutes);

// Start Agenda
(async function () {
  await agenda.start();
})();

agenda.on('ready', async () => {
  console.log('🟢 Agenda ready!');
  await agenda.start();
  await setupRecurringJobs(agenda); // <-- Add this
});

agenda.on('start', (job) => {
  console.log(`⏳ Job "${job.attrs.name}" starting...`);
});

agenda.on('complete', (job) => {
  console.log(`✅ Job "${job.attrs.name}" completed.`);
});

agenda.on('success', (job) => {
  console.log(`🎉 Job "${job.attrs.name}" succeeded.`);
});

agenda.on('fail', (err, job) => {
  console.error(`❌ Job "${job.attrs.name}" failed:`, err.message);
});

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
const graceful = async () => {

  console.log('🛑 Shutting down Agenda...');
  await agenda.stop();
  await mongoose.connection.close();
   server.close(() => {
    console.log('🧨 Server closed.');
    process.exit(0);
  });

};

process.on('SIGTERM', graceful);
process.on('SIGINT', graceful);



