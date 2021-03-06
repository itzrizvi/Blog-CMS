// ALL REQUIRES
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const errorFormatter = require('../utils/validationErrorFormatter');

// SIGN UP FUNCTION CONTROLLER
exports.signUpGetController = (req, res, next) => {
    res.render('pages/auth/signup', { title: 'Create A New Account', error: {}, value: {} });
}
exports.signUpPostController = async (req, res, next) => {

    let { username, email, phone, password } = req.body;
    console.log(req.body);

    let errors = validationResult(req).formatWith(errorFormatter);

    if (!errors.isEmpty()) {
        console.log(errors.mapped())
        return res.render('pages/auth/signup', {
            title: 'Create A New Account',
            error: errors.mapped(),
            value: {
                username,
                email,
                phone,
                password
            }
        });
    }

    try {

        let hashedPass = await bcrypt.hash(password, 11);
        let user = new User({
            username,
            email,
            phone,
            password: hashedPass
        });

        let createdUser = await user.save();
        console.log('User Created Successfully', createdUser);
        res.render('pages/auth/signup', { title: 'Create A New Account', error: {}, value: {} });

    } catch (err) {
        console.log(err);
        next(err);
    }

}
// LOGIN FUNCTION CONTROLLER
exports.logInGetController = (req, res, next) => {
    console.log(req.session.isLoggedIn, req.session.user);
    res.render('pages/auth/login', { title: "Login To Your Account", error: {}, value: {} });
}
exports.logInPostController = async (req, res, next) => {
    let { email, password } = req.body;

    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        return res.render('pages/auth/login', {
            title: "Login To Your Account",
            error: errors.mapped(),
            value: {
                email,
                password
            }
        });
    }

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
        req.session.isLoggedIn = true;
        req.session.user = user;
        res.render('pages/auth/login', { title: "Login To Your Account", error: {}, value: {} });

    } catch (err) {
        console.log(err);
        next(err);
    }
}
// LOG OUT FUNCTION CONTROLLER
exports.logOutController = (req, res, next) => {

}