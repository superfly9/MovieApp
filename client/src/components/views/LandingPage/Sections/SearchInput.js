import React,{useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import './SearchInput.css';
import Axios from 'axios';
import { searchMovie } from '../../../../_actions/movie_actions';
import {SEARCH_URL,API_KEY,API_URL } from '../../../Config';
import {Row,Col} from 'antd';
import dotenv from 'dotenv';

dotenv.config();
function SearchInput(props) {
    const API_KEY = process.env.API_KEY;
    const dispatch = useDispatch();
    const {searchPage} = props;
    const [searchValue,setSearchValue] = useState('');
    const [searchList,setSearchList] =useState([]);
    useEffect(()=>{
        const form = document.querySelector('.searchForm');
        console.log(searchPage,form)
        if (searchPage) form.classList.add('searchPage');
        console.log(form)
    },[])
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
            <Row>
                <Col lg={6} md={6} xs={6}>
                    <form className='searchForm' onSubmit={handleSearchSubmit}>
                        <input 
                            placeholder="영화 검색을 해보세요" 
                            value={searchValue} 
                            onChange={handleInputChange}
                        />
                        <button>Search</button>
                    </form>
                </Col>
                <Col lg={18} md={18} xs={16}>
                    <h2 className='search_title'>검색결과</h2>
                </Col>
            </Row>
        </div>
    )
}

export default SearchInput
