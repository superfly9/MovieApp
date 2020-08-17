import React from 'react'
import './MainImage.css';

function MainImage(props) {
    const {backImage,release_date,vote_count,vote_average,title,description,image} = props;
    console.log('Back:',backImage,'Poster:',image)
    const releaseYear =release_date.split('-')[0];
    return (
        <div className='mainImage_container' style={{backgroundImage:`${backImage}`}}>
            <div className='mainImage_poster'>
                <img src={image} alt={title} />
            </div>
            <div className='mainImage_movie'>
                <div className='mainImage_detail_info'>
                    <h2>{title} ({releaseYear})</h2>
                    <h3>개봉일 :{release_date}</h3>
                </div>
                <div className='mainImage_rating_info'>
                    <span>평점:{vote_average}</span>
                    <span>좋아요 수:{vote_count}</span>
                </div>
                <h3>개요</h3>
                <p>{description ? description :'개요가 없습니다.'}</p>
            </div>
        </div>
    )
}

export default MainImage
