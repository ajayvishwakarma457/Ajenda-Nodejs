module.exports = (agenda) => {


  agenda.define('greet user', { priority: 'low' }, async (job, done) => {
    try {
      const { name } = job.attrs.data;
      if (!name) throw new Error('No name provided');
      console.log(`👋 Hello, ${name}!`);
      done();
    } catch (err) {
      done(err);
    }
  });
  

};
