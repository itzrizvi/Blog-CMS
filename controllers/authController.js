// ALL REQUIRES
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const errorFormatter = require('../utils/validationErrorFormatter');

// SIGN UP FUNCTION CONTROLLER
exports.signUpGetController = (req, res, next) => {
    res.render('pages/auth/signup', { title: 'Create A New Account', error: {} });
}
exports.signUpPostController = async (req, res, next) => {
    let errors = validationResult(req).formatWith(errorFormatter);

    if (!errors.isEmpty()) {
        return res.render('pages/auth/signup', { title: 'Create A New Account', error: errors.mapped() });
    }

    let { username, email, phone, password } = req.body;


    try {

        let hashedPass = await bcrypt.hash(password, 11);
        let user = new User({
            userName: username,
            email,
            phone,
            password: hashedPass
        });

        let createdUser = await user.save();
        console.log('User Created Successfully', createdUser);
        res.render('pages/auth/signup', { title: 'Create A New Account' });

    } catch (err) {
        console.log(err);
        next(err);
    }

}
// LOGIN FUNCTION CONTROLLER
exports.logInGetController = (req, res, next) => {
    res.render('pages/auth/login', { title: "Login To Your Account" });
}
exports.logInPostController = async (req, res, next) => {
    let { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.json({
                message: "Invalid Credentials"
            });
        }

        let matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.json({
                message: "Invalid Credentials"
            });
        }

        console.log('Successfully Logged In', user);
        res.render('pages/auth/login', { title: "Login To Your Account" });

    } catch (err) {
        console.log(err);
        next(err);
    }
}
// LOG OUT FUNCTION CONTROLLER
exports.logOutController = (req, res, next) => {

}