// All Requires
const router = require('express').Router();
const signupValidator = require('../validator/auth/signupValidator');
const loginValidator = require('../validator/auth/loginValidator');

// Custom Module/Controller
const { signUpGetController,
    signUpPostController,
    logInGetController,
    logInPostController,
    logOutController } = require('../controllers/authController');


// ROUTES
router.get('/signup', signUpGetController);
router.post('/signup', signupValidator, signUpPostController);

router.get('/logIn', logInGetController);
router.post('/logIn', loginValidator, logInPostController);

router.get('/logOut', logOutController);



// EXPORTS
module.exports = router;