// ALL REQUIRES
const User = require('../models/User');

// SIGN UP FUNCTION CONTROLLER
exports.signUpGetController = (req, res, next) => {
    res.render('pages/auth/signup', { title: 'Create A New Account' });
}
exports.signUpPostController = async (req, res, next) => {
    let { username, email, phone, password } = req.body;
    let user = new User({
        userName: username,
        email,
        phone,
        password
    });

    try {
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

}
exports.logInPostController = (req, res, next) => {

}
// LOG OUT FUNCTION CONTROLLER
exports.logOutController = (req, res, next) => {

}