import React, { Fragment } from 'react'
import {useSelector} from 'react-redux';
import GridCard from '../views/Util/GridCard';
import { IMAGE_BASE_URL } from '../Config';
import './SearchedPage.css';

function SearchedPage(props) {
    const movie = useSelector(state=>state.movie);
    const {movieResult} = movie;
    const resultLength = movieResult.length;

    const filterdMovie = movieResult.sort((a,b)=>{
        return b.popularity - a.popularity;
    })

    const navbar = (movieInfo)=>{
        return (
            <Fragment>                
                <p className='search_result_bar'>검색 결과</p>
                <ul className='search_length_bar'>
                        <li>
                            <span>Movie </span>
                            <a>{movieInfo.length}</a>
                        </li>
                        <li>
                            <span>TV Shows </span>
                            <a>{0}</a>
                        </li>
                </ul>
            </Fragment>
        )
    }
    const renderMovie = filterdMovie.map((movieInfo,index)=>{
        if (index===0) {
            return (
                <Fragment key={index}>
                    <GridCard
                        navbar={navbar}
                        filterdMovie={filterdMovie}
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
            )
        } else {
            return (
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
            )
        }
    })

    return (
        <div className='search_movie_container'>
            {renderMovie}
        </div>
    )
}
export default SearchedPage