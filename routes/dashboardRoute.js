// ALL REQUIRES
const router = require('express').Router();
const { isAuthenticated } = require('../middleware/authMiddleware')
const { daboardGetController } = require('../controllers/dashboardController');

router.get('/', isAuthenticated, daboardGetController);

module.exports = router;