module.exports = (agenda) => {
  agenda.define('fetch user data', async (job, done) => {
    const { userId } = job.attrs.data;

    console.log(`📥 Fetching data for user: ${userId}`);

    // Simulate user data
    const userData = {
      email: 'newuser@example.com',
      name: 'New User',
    };

    // Chain next job
    await agenda.now('send welcome email', { ...userData });

    done();
  });
};
