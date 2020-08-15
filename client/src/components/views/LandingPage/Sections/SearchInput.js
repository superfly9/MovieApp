import React,{useState} from 'react';
import './SearchInput.css';
import Axios from 'axios';
import { Input } from 'antd';
import {SEARCH_URL, API_KEY } from '../../../Config';
const { Search } = Input;


function SearchInput() {
    const [searchValue,setSearchValue] = useState('');
    const [searchList,setSearchList] =useState([]);
    const handleInputChange = (event) =>{
        const { target : {value}} = event;
        setSearchValue(value);
    }
    const handleSearchSubmit =(event)=>{
        event.preventDefault();
        setSearchValue('');
        Axios.get(`${SEARCH_URL}?api_key=${API_KEY}&language={en-KO}&query=${searchValue}&page=1&include_adult=false`)
            .then(response=>{
                const {data : {results}} = response;
                console.log('Result:',results) //Array;
                window.location.assign('/search/result')        
            })
    }
    return (
        <div>
            <form className='searchForm' onSubmit={handleSearchSubmit}>
                <Search placeholder="영화 검색을 해보세요" 
                    value={searchValue} 
                    onChange={handleInputChange}
                    onSearch={value => console.log(value)} 
                    enterButton={'검색'}
                    size='large'
                />
            </form>
        </div>
    )
}

export default SearchInput
