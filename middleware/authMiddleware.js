// All Requires
const User = require('../models/User');
// Session Binding User
exports.bindUserWithReq = () => {
    return (req, res, next) => {
        if (!req.session.isLoggedIn) {
            return next();
        }

        try {
            let user = User.findById(req.session.user._id);
            req.user = user;
            next();
        } catch (error) {
            console.log(error);
            next(error)
        }


    }
}