// ALL REQUIRES
const User = require('../models/User');
const bcrypt = require('bcrypt');

// SIGN UP FUNCTION CONTROLLER
exports.signUpGetController = (req, res, next) => {
    res.render('pages/auth/signup', { title: 'Create A New Account' });
}
exports.signUpPostController = async (req, res, next) => {
    let { username, email, phone, password } = req.body;

    try {

        let hashedPass = await bcrypt.hash(password, 11);
        console.log(hashedPass);
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
exports.logInPostController = (req, res, next) => {

}
// LOG OUT FUNCTION CONTROLLER
exports.logOutController = (req, res, next) => {

}