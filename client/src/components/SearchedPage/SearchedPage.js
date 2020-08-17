import React, { Fragment } from 'react'
import {useSelector} from 'react-redux';
import GridCard from '../views/Util/GridCard';
import { IMAGE_BASE_URL } from '../Config';
import './SearchedPage.css';

function SearchedPage(props) {
    const movie = useSelector(state=>state.movie);
    const {movieResult} = movie;
    const resultLength = movieResult.length;

        //popularity순으로 내림차순 정렬해야
    const filterdMovie = movieResult.sort((a,b)=>{
        return b.popularity - a.popularity;
    })

    const renderMovie = filterdMovie.map((movieInfo,index)=>(
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