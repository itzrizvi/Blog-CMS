// All Requires
const router = require('express').Router();
const { body } = require('express-validator');
const User = require('../models/User');

// Custom Module/Controller
const { signUpGetController,
    signUpPostController,
    logInGetController,
    logInPostController,
    logOutController } = require('../controllers/authController');

// Validator Array
const signupValidator = [
    body('username')
        .isLength({ min: 2, max: 15 })
        .withMessage('Username must be between 2 to 15 chars!!!')
        .custom(async username => {
            let userFind = await User.findOne({ username });
            if (userFind) {
                return Promise.reject('Username Already in Use!!!')
            }
        })
        .trim(),
    body('email')
        .isEmail()
        .withMessage('Please provide a valid E-mail!!!')
        .custom(async email => {
            let emailFind = await User.findOne({ email });
            if (emailFind) {
                return Promise.reject('Email is already in use!!!')
            }
        })
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Your password must be greater than 6 chars!!!'),
    body('passwordTwo')
        .isLength({ min: 6 })
        .withMessage('Password didn\'t matched!!!')
        .custom((matchPass, { req }) => {
            if (matchPass !== req.body.password) {
                return Promise.reject('Password does not matched!!!')
            }
        })
];



// ROUTES
router.get('/signUp', signUpGetController);
router.post('/signUp', signupValidator, signUpPostController);

router.get('/logIn', logInGetController);
router.post('/logIn', logInPostController);

router.get('/logOut', logOutController);



// EXPORTS
module.exports = router;