// All Requires
const { Schema, model } = require('mongoose');


// POST SCHEMA
const postShema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
});