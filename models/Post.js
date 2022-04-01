// All Requires
const { Schema, model } = require('mongoose');
const User = require('./User');
const Comment = require('./Comment');


// POST SCHEMA
const postSchema = new Schema({
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
        ref: User,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    thumbnail: String,
    readTime: String,
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: User
        }
    ],
    disLikes: [
        {
            type: Schema.Types.ObjectId,
            ref: User
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: Comment
        }
    ]
}, { timestamps: true });


// POST MODEL
const Post = model('Post', postSchema);


// EXPORTS
module.exports = Post;