module.exports = (agenda) => {
   agenda.define('say hello', { priority: 'high' }, async () => {
    console.log('👋 Hello from Agenda!');
  });
};
