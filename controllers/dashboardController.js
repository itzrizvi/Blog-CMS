// Dashboard GET Controller
exports.daboardGetController = (req, res, next) => {
    res.render('pages/dashboard/admin_index.ejs', { title: 'Admin Dashboard' });
}