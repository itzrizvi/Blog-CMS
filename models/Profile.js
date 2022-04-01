// All requires
const { Schema, model } = require('mongoose');

// Profile Schema
const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        trim: true,
        maxlength: 100
    },
    bio: {
        type: String,
        trim: true,
        maxlength: 500
    },
    profilePhoto: String,
    links: {
        website: String,
        github: String,
        linkedIn: String,
        twitter: String,
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]

}, { timestamps: true });



// Profile Model
const Profile = model('Profile', profileSchema);

// Exports
module.exports = Profile;