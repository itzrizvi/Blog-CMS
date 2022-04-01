// All Requires
const router = require('express').Router();

// Custom Module/Controller
const { signUpGetController,
    signUpPostController,
    logInGetController,
    logInPostController,
    logOutController } = require('../controllers/authController');



// ROUTES
router.get('/signUp', signUpGetController);
router.post('/signUp', signUpPostController);

router.get('/logIn', logInGetController);
router.post('/logIn', logInPostController);

router.get('/logOut', logOutController);



// EXPORTS
module.exports = router;