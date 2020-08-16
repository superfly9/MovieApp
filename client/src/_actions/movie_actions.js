import Axios from 'axios';
import {SEARCH_MOVIE} from './types';

export function searchMovie (movieResult) {
    console.log('Seoul')
    console.log('movieResult:',movieResult);
     return {
        type : SEARCH_MOVIE,
        payload : movieResult
    }  
}