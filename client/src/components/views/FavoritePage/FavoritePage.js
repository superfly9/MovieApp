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
        <div style={{width:'85%',margin:'3rem auto'}}>
            <h2>Favorite Movie</h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <td>Movie Title</td>
                        <td>Movie RunTime</td>
                        <td>Remove from favorites</td>
                    </tr>
                </thead>
                <tbody>
                    {Favorited && Favorited.map((movieItem,index)=>(
                        <tr key={index}>
                            <td>{movieItem.movieTitle}</td>
                            <td>{movieItem.movieRunTime}</td>
                            <td><button>Remove</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
