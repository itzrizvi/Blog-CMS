// All Requires
const { Schema, model } = require('mongoose');
const Post = require('./Post');
const User = require('./User');


// COMMENT SCHEMA
const commentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: Post,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    body: {
        type: String,
        trim: true,
        required: true
    },
    replies: [
        {
            body: {
                type: String,
                required: true
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: User,
                required: true
            },
            createdAt: {
                type: Date,
                default: new Date()
            }
        }
    ]

}, { timestamps: true });


// COMMENT MODEL
const Comment = model('Comment', commentSchema);


// Exports
module.exports = Comment;