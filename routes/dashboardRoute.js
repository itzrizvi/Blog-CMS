// ALL REQUIRES
const router = require('express').Router();
const { daboardGetController } = require('../controllers/dashboardController');

router.get('/', daboardGetController);

module.exports = router;