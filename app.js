// ALL Requires
const express = require('express');


// PORT 
const PORT = process.env.PORT || 5000;

// Creating APP
const app = express();


// ROOT
app.get('/', (req, res) => {
    res.json({
        message: 'Hello From Blog'
    });
});

// SERVER LISTEN
app.listen(PORT, () => {
    console.log(`Server is Running on PORT ${PORT}`);
})