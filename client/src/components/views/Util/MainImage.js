import React from 'react'
import './MainImage.css';

function MainImage(props) {
    const {backImage,release_date,vote_count,vote_average,title,description,image} = props;
    const releaseYear =release_date.split('-')[0];
    return (
        <div className='mainImage_container' style={{
            backgroundImage:`url(${backImage})`,
            backgroundSize:'cover',
            backgroundPosition:'center',
            borderRadius:'20px'
        }}>
            <div className='opacity_container'
                style={{backgroundImage:`linear-gradient(to right, rgba(14.12%, 14.51%, 16.86%, 1.00) 150px, rgba(22.35%, 22.35%, 22.35%, 0.84) 100%)`}}
            >
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
        </div>
    )
}

export default MainImage
