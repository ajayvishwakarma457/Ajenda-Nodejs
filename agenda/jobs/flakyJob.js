module.exports = (agenda) => {
  agenda.define('flaky job', async (job, done) => {
    const shouldFail = Math.random() < 0.5;

    console.log(`🧪 Running flaky job...`);

    if (shouldFail) {
      console.log(`❌ Job failed, will retry...`);
      throw new Error('Random failure!');
    }

    console.log(`✅ Flaky job succeeded!`);
    done();
  });
};
