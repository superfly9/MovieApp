const express = require('express');
const commentRouter = express.Router();
const {Comment} = require('../models/Comment');


commentRouter.post('/save',(req,res)=>{
    const { body : {writer,movieId,content}} = req;
    const comment = new Comment(req.body);
    comment.save((err,comment)=>{
        console.log('1st check:',comment);
        if (err) return res.json({err,success:false});
        Comment.find({writer,movieId})
            .populate('writer')
            .exec((err,commentList)=>{
                if (err) return res.json({err,success:false});
                console.log('new Comment:',commentList);
                res.json({success:true,commentList})
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
   const { body:{ responseTo,movieId,writer }} = req;
   console.log('req.body',req.body)
   Comment.findOneAndDelete({responseTo,movieId,writer})
        .exec((err,deleted)=>{
        if (err) return res.json({err,result:false});
        console.log('Deleted:',deleted)
        Comment.find({movieId})
        .populate('writer')
        .exec((err,commentList)=>{
            if (err) return res.json({err,success:false});
            //console.log('deleted comment:',commentList);
            res.json({success:true,commentList})
        })
    })
});

module.exports = commentRouter;