module.exports = (agenda) => {
  agenda.define('high priority task',{priority: 'high',concurrency: 1},
    async (job) => {
      console.log(`🔥 High-priority task running at ${new Date()}`);
    }
  );
};
