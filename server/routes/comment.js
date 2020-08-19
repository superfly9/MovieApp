const express = require('express');
const commentRouter = express.Router();
const {Comment} = require('../models/Comment');


commentRouter.post('/save',(req,res)=>{
    const { body : {writer,movieId,content}} = req;
    const comment = new Comment(req.body);
    comment.save((err,comment)=>{
        if (err) return res.json({err,success:false});
        Comment.findOne({writer,movieId,content})
            .populate('writer')
            .exec((err,comment)=>{
                if (err) return res.json({err,success:false});
                res.json({success:true,comment})
            })
    })
})

commentRouter.post('/getComment',(req,res)=>{
    const { body :{movieId} } = req;
    Comment.find({movieId})
        .populate('writer')
        .exec((err,commentList)=>{
            if (err) return res.json({success:false,err});
            res.json({success:true,commentList})
        })
})

commentRouter.post('/delete',(req,res)=>{
    
   let { body:{ commentId ,movieId, }} = req;
   Comment.findOneAndDelete({_id:commentId,movieId})
        .exec((err,deleted)=>{
        if (err) return res.json({err,result:false});
        Comment.find({movieId})
            .populate('writer')
            .exec((err,commentList)=>{
                if (commentList === null) commentList = [];
                if (err) return res.json({err,result:false});
                res.json({success:true,commentList})
            })
    })
});

module.exports = commentRouter;