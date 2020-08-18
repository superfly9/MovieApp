import React,{useState, Fragment} from 'react';
import {useSelector} from 'react-redux';
import Axios from 'axios';
import './Comment.css';

function SingleComment(props) {
    const user = useSelector(state=>state.user);
    const {movieId,commentUpdate,writer,content,responseTo}=props;
    const {userData : { _id :userId }}=user;
    const [OpenReply,setOpenReply]=useState(false);
    const [CommentValue,setCommentValue]=useState('');
    const toggleReply=()=>setOpenReply(!OpenReply);
    const handleChange=(event)=>{
        const {target:{value}}=event;
        console.log('Value:',value);
        setCommentValue(value);
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const body =  {
            writer:userId,
            movieId,
            content:CommentValue,
            responseTo
        }
        Axios.post('/comment/save',body)
        .then(response=>{
            if (response.data.success) {
                //새로 생긴 코멘트 업데이트
                commentUpdate(response.data.commentList);
            } else {
                alert('댓글 생성에 실패했습니다.')
            }
        })
        setCommentValue('')
    }

    const renderForm =()=>{
        if (userId) {
            return (
                <Fragment>
                    <form className='comment_form' onSubmit={handleSubmit}>
                        <textarea
                        className='comment_textarea' 
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder='내용을 입력하세요.' />
                        <button className='comment_btn' onClick={handleSubmit}>댓글 등록</button>
                    </form>
                </Fragment>
            )
        } else {
            return (
                <p>로그인 시 댓글 작성이 가능합니다</p>
            )
        }
    }
    const renderComment=()=>{
        return (
            <Fragment>
                <div className='writer'>
                    <img src={writer.image} />
                </div>
                <div className='single_info'>
                    <span className='writer_name'>{writer.name}</span>
                    <p className='comment'>{content}</p>
                </div>
            </Fragment>
        )
    }
    return (
        <div className='single_comment_container'>
            {renderComment()}
            <p onClick={toggleReply}>답글 보기</p>
            {OpenReply && renderForm()}
        </div>
    )
}

export default SingleComment
