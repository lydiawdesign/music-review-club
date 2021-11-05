const router = require('express').Router();

// const apiRoutes = require('./api');
const homeRoutes = require('./homeroute');
// const dashboardRoutes = require('./dashboard');

// router.use('/api', apiRoutes);
// router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);

module.exports = router;