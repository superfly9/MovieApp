import React, { useEffect,useState } from 'react'
import Axios from 'axios';
import './Favorite.css';

function FavoritePage() {
    const [Favorited,setFavorited] = useState([]);
    useEffect(()=>{
        Axios.post(`/favorite/getFavoredMovie`,{userFrom : localStorage.getItem('userId')})
            .then(response=>{
                if (response.data.success) {
                    console.log(response.data.favorites)
                    setFavorited([...response.data.favorites])
                } else {
                    alert('영화 정보를 가져오는 데 실패했습니다.');
                }
            })
    },[]);
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
                            <td>{movieItem.movieTitle}</td>
                            <td>{movieItem.movieRunTime}</td>
                            <td><button className='remove_btn'>Remove</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
