import React,{useEffect,useState} from 'react'
import GridCard from '../Util/GridCard'
import Axios from 'axios';
import {Row} from 'antd';
import './LandingPage.css';
import SearchInput from '../Util/SearchInput';
import { IMAGE_BASE_URL,API_URL,API_KEY } from '../../Config.js';

function LandingPage() {
    const [Movies,setMovies] = useState([]);
    const [MainMovie,setMainMovie] = useState(null);
    const [CurrentPage,setCurrentPage] = useState(1);

    const getItems  = (endPoint) =>{
        Axios.get(endPoint)     
                .then(response=>{
                    const {data : {results,page}} = response;
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
                                `${IMAGE_BASE_URL}w500${movieItem.poster_path}` :'/uploads/img/noImage.png'}
                            title={movieItem.title}
                            description={movieItem.overview}
                        />
                    ))}
                </Row>
                
                <div style={{margin:'2rem',textAlign:'center'}}>
                    <button className='load_more_btn' onClick={loadMoreItems}>영화 더 보기</button>
                </div>
        </div>
    )
}

export default LandingPage
