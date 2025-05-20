//agendaInstance.js
const { Agenda } = require('agenda');
require('dotenv').config();

const agenda = new Agenda({
  db: { address: process.env.DB_URI, collection: 'jobs' },
});

require('./jobs/fetchUserDataJob')(agenda);
require('./jobs/flakyJob')(agenda);
require('./jobs/greetUserJob')(agenda);
require('./jobs/helloJob')(agenda);
require('./jobs/sendEmailJob')(agenda);
require('./jobs/sendSMSJob')(agenda);
require('./jobs/sendWelcomeEmailJob')(agenda);



module.exports = agenda;
