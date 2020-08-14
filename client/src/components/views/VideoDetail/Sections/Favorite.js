import React, { useEffect,useState } from 'react'
import Axios from 'axios'
import { Server_URL } from '../../../url';

function Favorite(props) {
    const { movieId, movieInfo:{ original_title:movieTitle, runtime : movieRunTime}} = props;
    const userId =localStorage.getItem('userId');
    const [Favorited,setFavorited] = useState(false);
    const [FavoriteNumber,setFavoriteNumber] = useState(0);
    const body = {
        movieId ,
        movieTitle ,
        movieRunTime,
        userFrom: userId
    }
    useEffect(()=>{
        Axios.post(`${Server_URL}/favorite/favoriteNumber`,body)
            .then(response=>{
                if (response.data.success) {
                    setFavoriteNumber(response.data.favoriteNumber);
                } else {
                    alert('좋아요 수를 가져오는 데 실패했습니다.')
                }
            })

        Axios.post(`${Server_URL}/favorite/favorited`,body)
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
            Axios.post(`${Server_URL}/favorite/removeFromFavorite`,body)
                .then(response=>{
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber-1);
                        setFavorited(!Favorited)
                    } else {
                        alert('정보를 가져 오는데 실패했습니다.')
                    }
                })
        } else {
            Axios.post(`${Server_URL}/favorite/addToFavorite`,body)
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
        <div style={{display:'flex',justifyContent:'flex-end'}}>
            <button onClick={handleFavorite} style={{padding:'0.2rem .5rem'}}>{Favorited ? 'Not Favorite' : 'Add to Favorite'} {FavoriteNumber}</button>
        </div>
    )
}

export default Favorite
