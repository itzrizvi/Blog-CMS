// Dashboard GET Controller
exports.daboardGetController = (req, res, next) => {
    res.render('pages/dashboard/dashboard', { title: 'Dashboard' });
}