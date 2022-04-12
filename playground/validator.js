const router = require('express').Router();

router.get('/validator', (req, res, next) => {
    res.render('playground/signup', { title: 'Validator Playground' })
});

router.post('/validator', (req, res, next) => {

});



module.exports = router;