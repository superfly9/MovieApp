const express = require('express');
const commentRouter = express.Router();
const {Comment} = require('../models/Comment');


commentRouter.post('/save',async(req,res)=>{
    const { body : {writer,movieId,content}} = req;
    const comment = new Comment(req.body);
    comment.save((err,comment)=>{
        if (err) return res.json({err,success:false});
        Comment.find({_id:writer})
            .populate('writer')
            .exec((err,result)=>{
                if (err) return res.json({err,success:false});
                console.log('new Comment:',result);
                res.json({success:true,result})
            })
    })
})