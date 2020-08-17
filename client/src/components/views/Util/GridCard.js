import React, { Fragment } from 'react'
import { Col } from 'antd'
import './GridCard.css';

function GridCard(props) {
    const {navbar,filterdMovie,image,title,release_date,id,overview} = props;
    if (props.landingPage) {
        return (
            <Col lg={6} md={8} xs={24}>
                <div className='grid_landing_container'>
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
    } else if (props.searchMovie) {
        return (
            <Fragment>
                <Col lg={6} md={6} xs={6}>
                    {navbar && navbar(filterdMovie)}
                </Col>
                <Col lg={18} md={18} xs={18}>
                    <div className='grid_container'>
                        <a href={`/movie/${id}`}>
                            <img className='grid_img' src={image} alt={title}></img>
                        </a>
                        <div className='movie_info'>
                            <span className='movie_info_title'>{title}</span>
                            <span className='movie_info_release_date'>{release_date}</span>
                            <div className='movie_info_overview'>
                                <p className='movie_info_overview_p'>{overview}</p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Fragment>
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
