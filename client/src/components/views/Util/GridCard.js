import React from 'react'
import { Col } from 'antd'
import './GridCard.css';

function GridCard(props) {
    const {image,title,release_date,vote_average,id} = props;
    if (props.landingPage) {
        return (
            <Col lg={6} md={8} xs={24}>
                <div className='grid_container'>
                    <a href={`/movie/${id}`}>
                        <img className='grid_img' src={image} alt={title}></img>
                    </a>
                    <div className='moive_info'>
                        <span className='movie_info_title'>{title}</span>
                        <span className='movie_info_release_date'>{release_date}</span>
                    </div>
                </div>
            </Col>
        )
    } else {
        return (
            <Col lg={6} md={8} xs={24}>
                <div className='grid_actor_container'>
                    <img className='grid_img' src={props.image} alt={props.title}></img>
                </div>
            </Col>
        )
    }
}

export default GridCard
