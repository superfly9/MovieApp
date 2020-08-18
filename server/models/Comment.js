const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    movieId : String,
    content : String,
    writer : {
        ref:'User',
        type:mongoose.Schema.Types.ObjectId
    },
    responseTo : {
        ref:'User',
        type:mongoose.Schema.Types.ObjectId
    }
},{timestamps:true});

const Comment = mongoose.model('Comment',CommentSchema);
module.exports = {Comment};