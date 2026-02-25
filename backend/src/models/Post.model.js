const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    Image: {
        type: String,
        required: true
    },
    Caption: {
        type: String,
        required: true
    },
    Likes: {
        type: Number,
        default: 0
    },
    Liked: {
        type: Boolean,
        default: false
    },

})

const postModel = mongoose.model('post', postSchema);

module.exports = postModel;