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
        .exec((err,removedItem)=>{
            console.log('removed from Favorite:',removedItem);
            if (err) return res.json({err,success:false});
            res.json({success:true});
        })
})

favoriteRouter.post('/addToFavorite',async (req,res)=>{
    console.log(req.body)
    const newFavorite = await new Favorite(req.body);
    newFavorite.save((err,favorite)=>{
        if (err) return res.json({err,success:false});
        res.json({success:true})
    })
})

module.exports  = favoriteRouter;