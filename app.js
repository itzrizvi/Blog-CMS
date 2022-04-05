// ALL Requires
const express = require('express');
const morgan = require('morgan');


// PORT 
const PORT = process.env.PORT || 5000;

// Creating APP
const app = express();

// EJS VIEW/TEMPLATE ENGINE
app.set('view engine', 'ejs');
app.set('views', 'views');

// MIDDLE WARES ARRAY
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json(),
];
app.use(middleware);

// ROOT
app.get('/', (req, res) => {
    res.render('pages/auth/signup', { title: 'Create a New Account' })
    // res.json({
    //     message: 'Hello From Blog'
    // });
});

// SERVER LISTEN
app.listen(PORT, () => {
    console.log(`Server is Running on PORT ${PORT}`);
})