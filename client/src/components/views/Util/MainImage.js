import React from 'react'
import './MainImage.css';
function MainImage(props) {
    const {release_date,vote_count,vote_average,title,description,image} = props;
    const releaseYear =release_date.split('-')[0];
    return (
        <div className='mainImage_container'>
            <div className='mainImage_poster'>
                <img src={image} alt={title} />
            </div>
            <div className='mainImage_movie'>
                <div className='mainImage_detail_info'>
                    <h2>{title} ({releaseYear})</h2>
                    <h3>{release_date}</h3>
                </div>
                <div className='mainImage_rating_info'>
                    <span>Rating:{vote_average}</span>
                    <span>Vote:{vote_count}</span>
                </div>
                <h3>개요</h3>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default MainImage
