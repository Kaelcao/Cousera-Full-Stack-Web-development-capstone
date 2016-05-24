/**
 * Created by caoanhquan on 5/20/16.
 */
var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true
    }
}, {timestamps: true});

var articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        index: true
    },
    content: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    category_id: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    comments: [commentSchema]
}, {timestamps: true});

mongoose.model('Article', articleSchema);