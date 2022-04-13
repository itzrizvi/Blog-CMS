// All Requires
const router = require('express').Router();
const signupValidator = require('../validator/auth/signupValidator');

// Custom Module/Controller
const { signUpGetController,
    signUpPostController,
    logInGetController,
    logInPostController,
    logOutController } = require('../controllers/authController');


// ROUTES
router.get('/signUp', signUpGetController);
router.post('/signUp', signupValidator, signUpPostController);

router.get('/logIn', logInGetController);
router.post('/logIn', logInPostController);

router.get('/logOut', logOutController);



// EXPORTS
module.exports = router;