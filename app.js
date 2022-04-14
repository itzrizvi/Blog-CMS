// ALL Requires
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config()

// IMPORT ROUTES
const authRoutes = require('./routes/authRoute');


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
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 2 * 60 * 60 * 1000
        }
    })
];
app.use(middleware);

app.use('/auth', authRoutes);


// ROOT
app.get('/', (req, res) => {
    res.json({
        message: 'Hello From Blog'
    });
});

// CONNECT DB WITH MONGOOSE
mongoose.connect(`mongodb+srv://rizviPc:MIc9SwAQSjvwgUuY@cluster1.fprcc.mongodb.net/myFirstDatabase`, { useNewUrlParser: true })
    .then(() => {
        // SERVER LISTEN
        app.listen(PORT, () => {
            console.log(`Server is Running on PORT ${PORT}`);
        });
    })
    .catch(err => {
        console.log(err);
    })
