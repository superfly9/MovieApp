import React,{useState,Fragment} from 'react'
import { useSelector } from 'react-redux';
import Axios from 'axios';
import SingleComment from './SingleComment';
import './Comment.css';
import ReplyComment from './ReplyComment';

function Comment(props) {
    const user = useSelector(state=>state.user);
    const {userData : { _id :userId,image }} = user;
    const [CommentValue,setCommentValue] = useState([]);
    const { commentList,commentUpdate,movieId } =props;
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const body =  {writer:userId,movieId,content:CommentValue}
        Axios.post('/comment/save',body)
        .then(response=>{
            if (response.data.success) {
                commentUpdate(response.data.comment);
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
                <div className='root_form'>
                    <div className='writer'>
                        <img src={image} />
                    </div>
                    <form className='comment_form' onSubmit={handleSubmit}>
                        <textarea 
                        className='comment_textarea'
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder='내용을 입력하세요.' />
                        <button className='comment_btn' onClick={handleSubmit}>댓글 등록</button>
                    </form>
                </div>
            )
        } else {
            return (
                <p>로그인 시 댓글 작성이 가능합니다</p>
            )
        }
    }

    const renderComment = commentList.length>0 && commentList.map((comment,index)=>{
        return (
            !comment.responseTo&&
                <Fragment key={index}>
                    <SingleComment 
                        comment={comment}
                        movieId={movieId} 
                        commentUpdate={commentUpdate}/>
                    <ReplyComment
                        movieId={movieId} 
                        commentList={commentList}
                        parentCommentId={comment._id}
                        commentUpdate={commentUpdate} 
                    />
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
