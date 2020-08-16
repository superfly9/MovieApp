import React, { Fragment } from 'react'
import {useSelector} from 'react-redux';
import GridCard from '../views/Util/GridCard';
import { IMAGE_BASE_URL } from '../Config';
import './SearchedPage.css';

function SearchedPage(props) {
    const movie = useSelector(state=>state.movie);
    const {movieResult} = movie;
    const resultLength = movieResult.length;
    console.log('movie:',movieResult);

    const renderMovie = movieResult.map((movieInfo,index)=>(
        <Fragment key={index}>
            <GridCard
                searchMovie
                image={`${IMAGE_BASE_URL}w500${movieInfo.poster_path}`}
                title={movieInfo.title}
                release_date={movieInfo.release_date}
                vote_average={movieInfo.vote_average}
                id={movieInfo.id}
                overview={movieInfo.overview}
                resultLength={resultLength}
            />
        </Fragment>
    ))

    return (
        <div className='search_movie_container'>
            {renderMovie}
        </div>
    )
}
export default SearchedPage