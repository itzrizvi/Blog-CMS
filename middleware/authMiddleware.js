// All Requires
const User = require('../models/User');
// Session Binding User
exports.bindUserWithReq = () => {
    return async (req, res, next) => {
        if (!req.session.isLoggedIn) {
            return next();
        }

        try {
            let user = await User.findById(req.session.user._id);
            req.user = user;
            next();
        } catch (error) {
            console.log(error);
            next(error)
        }


    }
}