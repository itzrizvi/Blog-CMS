// ALL REQUIRES
const { body } = require('express-validator');
const User = require('../../models/User');

module.exports = [
    body('username')
        .isLength({ min: 2, max: 15 })
        .withMessage('Username must be between 2 to 15 chars!!!')
        .custom(async username => {
            let userFind = await User.findOne({ username });
            console.log(userFind);
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
        }),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Your password must be greater than 6 chars!!!'),
    body('passwordTwo')
        .isLength({ min: 6 })
        .withMessage('Password didn\'t matched!!!')
        .custom((matchPass, { req }) => {
            if (matchPass !== req.body.password) {
                throw new Error('Password does not matched!!!')
            }
            return true
        })
];