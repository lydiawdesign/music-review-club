const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/api', apiRoutes);
router.use('/dashboardRoutes', dashboardRoutes);
router.use('/', homeRoutes);

module.exports = router;