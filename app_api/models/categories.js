/**
 * Created by caoanhquan on 5/24/16.
 */
var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    }
});

mongoose.model('Category', categorySchema);