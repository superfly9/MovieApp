import React, { useEffect,useState } from 'react'
import Axios from 'axios'

function Favorite(props) {
    console.log('props.movieInfo:',props.movieInfo)
    const userId =localStorage.getItem('userId');
    const [Favorited,setFavorited] = useState(false);
    const [FavoriteNumber,setFavoriteNumber] = useState(0);
    const body = {
        movieId : props.movieId,
        movieTitle : props.movieInfo.original_title,
        movieRunTime :props.movieInfo.runtime,
        userFrom: userId
    }
    useEffect(()=>{
        Axios.post('/api/favorite/favoriteNumber',body)
            .then(response=>{
                if (response.data.success) {
                    setFavoriteNumber(response.data.favoriteNumber);
                } else {
                    alert('좋아요 수를 가져오는 데 실패했습니다.')
                }
            })

        Axios.post('/api/favorite/favorited',body)
            .then(response=>{
                if (response.data.success) {
                    setFavorited(response.data.favorited);
                } else {
                    alert('정보를 가져오는 데 실패했습니다.')
                }
            })
    },[])

    const handleFavorite=()=>{
        console.log('Favorited:',Favorited)
        if (Favorited) {
            Axios.post('/api/favorite/removeFromFavorite',body)
                .then(response=>{
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber-1);
                        setFavorited(!Favorited)
                    } else {
                        alert('정보를 가져 오는데 실패했습니다.')
                    }
                })
        } else {
            Axios.post('/api/favorite/addToFavorite',body)
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
