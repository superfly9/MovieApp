const express= require('express');
const favoriteRouter = express.Router();
const {Favorite} = require('../models/Favorite');

favoriteRouter.post('/favoriteNumber',(req,res)=>{
    const { body :{ movieId}} = req;
    Favorite.find({movieId})
        .exec((err,favoriteInfo)=>{
            console.log('favoriteInfo:',favoriteInfo);
            if (err) return res.json({success:false});
            res.json({success:true,favoriteNumber : favoriteInfo.length})
        })
})

favoriteRouter.post('/favorited',(req,res)=>{
    const {body : {movieId,userFrom}} = req;
    Favorite.find({movieId,userFrom})
        .exec((err,favoriteInfo)=>{
            if (err) return res.json({success:false});
            let favorited = false;
            if (favoriteInfo.length!==0) favorited = true;
            res.json({success:true,favorited})
        })
})


favoriteRouter.post('/removeFromFavorite',(req,res)=>{
    const {body : {movieId,userFrom}} = req;
    Favorite.findOneAndDelete({movieId,userFrom})
        .exec((err,leftFavoriteInfo)=>{
            if (err) return res.json({success:false});
            res.json({success:true});
        })
})

favoriteRouter.post('/addToFavorite',(req,res)=>{

})

module.exports  = favoriteRouter;