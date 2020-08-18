import React,{useState,useEffect, Fragment} from 'react'
import { useSelector } from 'react-redux';
import Axios from 'axios';
import SingleComment from './SingleComment';

function Comment(props) {
    const user = useSelector(state=>state.user);
    const {userData : { _id :userId }} = user;
    const [CommentValue,setCommentValue] = useState([]);
    const { commentList,commentUpdate,movieId } =props;
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const body =  {writer:userId,movieId,content:CommentValue}
        console.log('body:',body)
        Axios.post('/comment/save',body)
        .then(response=>{
            if (response.data.success) {
                //새로 생긴 코멘트 업데이트
                console.log('rootCOmment;',response.data.commentList)
                commentUpdate(response.data.commentList);
            } else {
                alert('댓글 생성에 실패했습니다.')
            }
        })
        setCommentValue('')
    }
    const handleChange  = (e)=>{
        setCommentValue(e.target.value);
    }
    const renderForm = ()=>{
        if (userId) {
            return (
                <form onSubmit={handleSubmit}>
                    <textarea 
                    onChange={handleChange}
                    value={CommentValue}
                    placeholder='내용을 입력하세요.' />
                    <button onClick={handleSubmit}>댓글 등록</button>
                </form>
            )
        } else {
            return (
                <p>로그인 시 댓글 작성이 가능합니다</p>
            )
        }
    }

    const renderComment = commentList && commentList.map((comment,index)=>{
        return (
            <Fragment key={index}>
                <SingleComment 
                    writer={comment.writer} 
                    content={comment.content}  
                    movieId={movieId} 
                    responseTo={comment._id}
                    commentUpdate={commentUpdate}/>
            </Fragment>
        )
    })

    return (
        <div>
            <h2>댓글</h2>
            <hr />
            <div className='comment_container'>
                {renderForm()}
                {renderComment}
            </div>
        </div>
    )
}

export default Comment
