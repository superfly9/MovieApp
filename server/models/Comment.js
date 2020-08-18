const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    movieId : String,
    content : String,
    writer : {
        ref:'User',
        types:mongoose.Schema.Types.ObjectId
    },
    responseTo : {
        ref:'User',
        types:mongoose.Schema.Types.ObjectId
    }
})

const Comment = mongoose.model('Comment',CommentSchema);
module.export = {Comment};