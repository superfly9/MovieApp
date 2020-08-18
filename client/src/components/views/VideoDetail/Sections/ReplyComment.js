import React, { Fragment } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {
    const {parentCommentId, commentUpdate,commentList,movieId} = props;
    const renderReply=(parentCommentId)=>commentList&&commentList.map((comment,index)=>(
        <Fragment>
            {comment.responseTo === parentCommentId && 
                <div className='reply_container' style={{marginLeft:'40px'}}>
                     <SingleComment 
                        comment={comment}
                        movieId={movieId} 
                        commentUpdate={commentUpdate}/>
                    <ReplyComment
                        commentList={commentList}
                        parentCommentId={comment._id}
                        commentUpdate={commentUpdate} 
                        movieId={movieId}
                    />
                </div>
            }
        </Fragment>
    ))
    return (
        <div>
            Reply to
            {renderReply(parentCommentId)}
        </div>
    )
}

export default ReplyComment
