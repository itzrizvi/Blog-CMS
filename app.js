// ALL Requires
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config()

// IMPORT ROUTES
const authRoutes = require('./routes/authRoute');
const dashboardRoute = require('./routes/dashboardRoute');

// IMPORT CUSTOM MIDDLEWARES
const { bindUserWithReq } = require('./middleware/authMiddleware');
const setLocals = require('./middleware/setLocals');
// Creating APP
const app = express();

// MONGODB URI
const mongoDBURI = 'mongodb+srv://rizviPc:MIc9SwAQSjvwgUuY@cluster1.fprcc.mongodb.net/myFirstDatabase';

// MONGODB SESSION STORE CONNECT
const store = new MongoDBStore({
    uri: mongoDBURI,
    collection: 'blogCMSSessions',
    expires: 2 * 60 * 60 * 1000 // 2 hours expires
});

// PORT 
const PORT = process.env.PORT || 5000;


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
            maxAge: 2 * 60 * 60 * 1000  // 2 hours expires
        },
        store: store
    }),
    bindUserWithReq(),
    setLocals()
];
app.use(middleware);

// ROUTE DECLARATION
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoute);


// ROOT
app.get('/', (req, res) => {
    res.json({
        message: 'Hello From Blog'
    });
});

// CONNECT DB WITH MONGOOSE
mongoose.connect(mongoDBURI, { useNewUrlParser: true })
    .then(() => {
        // SERVER LISTEN
        app.listen(PORT, () => {
            console.log(`Server is Running on PORT ${PORT}`);
        });
    })
    .catch(err => {
        console.log(err);
    })
