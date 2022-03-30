// All Requires
const { Schema, model } = require('mongoose');


// USER SCHEMA 
const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 30,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: Schema.Types.ObjectId, // it will check if it is the MongoDB ObjectId type or not
        ref: 'Profile'
    }
}, {
    timestamps: true
});


// USER MODEL
const User = model('User', userSchema);


// EXPORT
module.exports = User;