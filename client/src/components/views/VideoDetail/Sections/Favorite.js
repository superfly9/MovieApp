import React, { useEffect,useState } from 'react'
import Axios from 'axios'
import './Favorite.css';

function Favorite(props) {
    const {movieId, movieInfo:{ poster_path:moviePost, title:movieTitle, runtime : movieRunTime}} = props;
    const userId =localStorage.getItem('userId');
    const [Favorited,setFavorited] = useState(false);
    const [FavoriteNumber,setFavoriteNumber] = useState(0);
    const body = {
        movieId ,
        movieTitle,
        movieRunTime,
        userFrom: userId,
        moviePost
    }
    useEffect(()=>{
        Axios.post(`/favorite/favoriteNumber`,body)
            .then(response=>{
                if (response.data.success) {
                    setFavoriteNumber(response.data.favoriteNumber);
                } else {
                    alert('좋아요 수를 가져오는 데 실패했습니다.')
                }
            })

        Axios.post(`/favorite/favorited`,body)
            .then(response=>{
                if (response.data.success) {
                    setFavorited(response.data.favorited);
                } else {
                    alert('정보를 가져오는 데 실패했습니다.')
                }
            })
    },[])

    const handleFavorite=()=>{
        if (Favorited) {
            Axios.post(`/favorite/removeFromFavorite`,body)
                .then(response=>{
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber-1);
                        setFavorited(!Favorited)
                    } else {
                        alert('정보를 가져 오는데 실패했습니다.')
                    }
                })
        } else {
            Axios.post(`/favorite/addToFavorite`,body)
            .then(response=>{
                if (response.data.success) {
                    setFavoriteNumber(FavoriteNumber+1);
                    setFavorited(!Favorited)
                } else {
                    alert('정보를 가져 오는데 실패했습니다.')
                }
            })
        }
    }
    return (
        <div className='favorite_btn_container'>
            <button className='favorite_btn' 
            onClick={handleFavorite}
            >{Favorited ? '취소하기' : '내 영화에 추가하기'} : {FavoriteNumber}</button>
        </div>
    )
}

export default Favorite
