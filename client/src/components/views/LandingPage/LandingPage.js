import React,{useEffect,useState} from 'react'
import GridCard from '../Util/GridCard'
import Axios from 'axios';
import {Row} from 'antd';
import './LandingPage.css';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import SearchInput from './Sections/SearchInput';

function LandingPage() {
    const [Movies,setMovies] = useState([]);
    const [MainMovie,setMainMovie] = useState(null);
    const [CurrentPage,setCurrentPage] = useState(1);

    const getItems  = (endPoint) =>{
        Axios.get(endPoint)     
                .then(response=>{
                    const {data : {results,page}} = response;
                    console.log(results[0])
                    setMovies([...Movies,...results]);
                    setMainMovie(results[0]);
                    setCurrentPage(page);
                })

    }
    useEffect(() => {
        const endPoint=`${API_URL}popular?api_key=${API_KEY}&language=ko&page=1`;
        getItems(endPoint);
    }, [])

    const loadMoreItems = ()=>{
        const newPage = CurrentPage+1;
        const endPoint=`${API_URL}popular?api_key=${API_KEY}&language=ko&page=${newPage}`;
        getItems(endPoint);
    }
    return (
        <div className='landingPage_container' style={{width:'85%',margin:'1rem auto'}}>
                <SearchInput />
                <h2>최신 영화</h2>
                <hr />

                <Row gutter={[16,16]}>
                    {Movies && Movies.map((movieItem,index)=>(
                        <GridCard 
                            landingPage={true} 
                            key={index} 
                            id={movieItem.id}
                            release_date={movieItem.release_date}
                            vote_average={movieItem.vote_average}
                            vote_count = {movieItem.vote_count}
                            image={movieItem.poster_path ?
                                `${IMAGE_BASE_URL}w500${movieItem.poster_path}` :null}
                            title={movieItem.original_title}
                            description={movieItem.overview}
                        />
                    ))}
                </Row>
                
                <div style={{margin:'2rem',textAlign:'center'}}>
                    <button onClick={loadMoreItems}>Load More</button>
                </div>
        </div>
    )
}

export default LandingPage
