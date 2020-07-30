const mongoose = require('mongoose');

const FavorteSchema = mongoose.Schema({
    userFrom : {
        ref:'User',
        type :mongoose.Schema.Types.ObjectId
    },
    movieId : String,
    movieRunTime : String,
    movieTitle : String,
    moviePost :String
},{timestamps:true});

const Favorite = mongoose.model('Favorite',FavorteSchema);

module.exports = {Favorite};