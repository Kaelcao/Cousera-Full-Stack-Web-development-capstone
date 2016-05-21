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
        type: ObjectId,
        required: true
    }
}, {timestamps: true});

var articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tag: {
        type: [String],
        index: trues
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    user_id: {
        type: ObjectId,
        required: true
    },
    category_id: {
        type: ObjectId,
        required: true
    },
    tags: [String],
    comments: [commentSchema]
}, {timestamps: true});