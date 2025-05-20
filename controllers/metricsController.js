const mongoose = require('mongoose');

const Job = mongoose.model('agendaJobs', new mongoose.Schema({}, { strict: false }));

exports.getMetrics = async (req, res) => {
  try {
    const [total, running, failed, completed, recentJobs] = await Promise.all([
      Job.countDocuments(),
      Job.countDocuments({ lockedAt: { $ne: null }, nextRunAt: { $gte: new Date() } }),
      Job.countDocuments({ failReason: { $exists: true } }),
      Job.countDocuments({ lastFinishedAt: { $ne: null }, failReason: null }),
      Job.find({})
        .sort({ lastFinishedAt: -1 })
        .limit(10)
        .select('name nextRunAt lastFinishedAt failReason data'),
    ]);

    res.json({stats: {total,running,failed,completed},recentJobs});
  } catch (err) {
    console.error('Error fetching metrics:', err);
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
};
