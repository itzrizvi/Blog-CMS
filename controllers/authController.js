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
        let user = await User.findOne({ email })
    } catch (err) {
        console.log(err);
        next(err);
    }
}
// LOG OUT FUNCTION CONTROLLER
exports.logOutController = (req, res, next) => {

}