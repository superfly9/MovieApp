import React, { Fragment, useEffect,useState } from 'react'
import SingleComment from './SingleComment'
//로그인 한 유저의 댓글만 바로 리렌더링 되고,나머지는 새로고침시 ㅂ인다
//responseTo: singleComment생성시 생긴 내 commentId
function ReplyComment(props) {
    const {parentCommentId, commentUpdate,commentList,movieId} = props;
    const [CommentLength,setCommentLenght] = useState(0);
    const [OpenReply,setOpenReply] = useState(true);
    useEffect(()=>{
        let commentLength = 0;
        commentList.forEach(comment=>{
            if (comment.responseTo === parentCommentId) {
                commentLength++;
            }
        })
        setCommentLenght(commentLength);
    },[commentList])

    const openReply=()=>setOpenReply(!OpenReply);
    const renderReply=(parentCommentId)=>commentList&&commentList.map((comment,index)=>(
        <Fragment key={index}>
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
            {CommentLength > 0 &&
                <p onClick={openReply}>{CommentLength}개의 댓글 보기</p>
            }
            {OpenReply && renderReply(parentCommentId)}
        </div>
    )
}

export default ReplyComment
