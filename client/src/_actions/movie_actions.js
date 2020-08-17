import {SEARCH_MOVIE} from './types';

export function searchMovie (movieResult) {
     return {
        type : SEARCH_MOVIE,
        payload : movieResult
    }  
}