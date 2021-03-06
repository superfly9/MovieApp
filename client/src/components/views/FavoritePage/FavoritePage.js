import React, { useEffect,useState } from 'react'
import Axios from 'axios';
import {Popover} from 'antd';
import './Favorite.css';
import { IMAGE_BASE_URL } from '../../Config';

function FavoritePage() {
    const [Favorited,setFavorited] = useState([]);
    useEffect(()=>{
        Axios.post(`/favorite/getFavoredMovie`,{userFrom : localStorage.getItem('userId')})
            .then(response=>{
                if (response.data.success) {
                    setFavorited([...response.data.favorites])
                } else {
                    alert('영화 정보를 가져오는 데 실패했습니다.');
                }
            })
    },[]);
    const removeFavoriteMovie = (movieId,userFrom) =>{
        const body = {movieId,userFrom}
        Axios.post('/favorite/deleteMovie',body)
            .then(response=>{
                if (response.data.success) {
                    const {data:{result}} =response;
                    setFavorited([...result]);      
                } else {
                    alert('영화 삭제에 실패했습니다.')
                }
            })
    }
    const content = (img)=>{
        const url = `${IMAGE_BASE_URL}w500${img}`
        return (
            <div className='popover'>
                <img src={url}/>
            </div>
        )
    }
    return (
        <div className='favorite_container'>
            <h2>내가 좋아하는 영화 </h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <td>제목</td>
                        <td>재생 시간</td>
                        <td>삭제하기</td>
                    </tr>
                </thead>
                <tbody>
                    {Favorited && Favorited.map((movieItem,index)=>(
                        <tr key={index}>
                            <Popover content={content(movieItem.moviePost)} title={movieItem.movieTitle}>
                                <td>{movieItem.movieTitle}</td>
                            </Popover>
                            <td>{movieItem.movieRunTime}분</td>
                            <td><button className='remove_btn' onClick={()=>removeFavoriteMovie(movieItem._id,movieItem.userFrom)}>삭제</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
