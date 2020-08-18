import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import Axios from 'axios';

function Comment(props) {
    const [CommentValue,setCommentValue] = useState([]);
    const { commentList,commentUpdate,movieId } =props;
    const user = useSelector(state=>state.user);
    const {userData : { _id :userId }} = user;
    
    const handleSubmit = (e) => {
        e.preventDefault();
        //writer:댓글 작성자
        const body =  {writer:userId,movieId,content:CommentValue}
        Axios.post('/comment/save',body)
            .then(response=>{
                if (response.data.success) {
                    //새로 생긴 코멘트 업데이트
                    commentUpdate()
                } else {
                    alert('댓글 생성에 실패했습니다.')
                }
            })
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
            <div>
                good
            </div>
        )
    })

    return (
        <div>
            <h2>댓글</h2>
            <hr />
            <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column'}}>
                {renderForm()}
                {renderComment}
            </form>
        </div>
    )
}

export default Comment
