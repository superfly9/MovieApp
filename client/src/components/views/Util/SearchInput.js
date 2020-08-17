import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import './SearchInput.css';
import Axios from 'axios';
import {SEARCH_URL, API_KEY } from '../../Config';
import { searchMovie } from '../../../_actions/movie_actions';


function SearchInput() {
    const dispatch = useDispatch();
    const [searchValue,setSearchValue] = useState('');
    const [searchList,setSearchList] =useState([]);
    const handleInputChange = (event) =>{
        const { target : {value}} = event;
        setSearchValue(value);
    }
    const handleSearchSubmit =(event)=>{
        event.preventDefault();
        setSearchValue('');
        Axios.get(`${SEARCH_URL}?api_key=${API_KEY}&language=ko&query=${searchValue}&page=1&include_adult=false`)
            .then(response=>{
                const {data : {results:movieResult}} = response;
                dispatch(searchMovie(movieResult))
                window.location.assign('/search/movie')        
            })
    }
    return (
        <div>
            <form className='searchForm' onSubmit={handleSearchSubmit}>
                <input 
                    placeholder="영화 검색을 해보세요" 
                    value={searchValue} 
                    onChange={handleInputChange}
                />
                <button>Search</button>
            </form>
        </div>
    )
}

export default SearchInput
