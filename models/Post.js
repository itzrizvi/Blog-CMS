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
    body: {
        type: String,
        required: true
    },
    author: {
        types: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    thumbnail: String,
    readTime: String,
    likes: [Schema.Types.ObjectId],
    disLikes: [Schema.Types.ObjectId],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});