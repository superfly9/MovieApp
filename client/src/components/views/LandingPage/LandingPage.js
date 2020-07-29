import React,{useEffect,useState} from 'react'
import MainImage from './Sections/MainImage'
import GridCard from '../Util/GridCard'
import Axios from 'axios';
import {Row} from 'antd';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';

function LandingPage() {
    const [Movies,setMovies] = useState([]);
    const [MainMovie,setMainMovie] = useState({});
    const [CurrentPage,setCurrentPage] = useState(1);

    const getItems  = (endPoint) =>{
        Axios.get(endPoint)     
                .then(response=>{
                    const {data : {results,page}} = response;
                    console.log(results,page)
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
        <div>
            {MainMovie &&<MainImage image={`${IMAGE_BASE_URL}w1280${MainMovie.backdrop_path}`} title={MainMovie.original_title} description={MainMovie.overview}/>}
            <div style={{width:'85%',margin:'1rem auto'}}>
                <h2>Movies by latest</h2>
                <hr />

                <Row gutter={[16,16]}>
                    {Movies && Movies.map((movieItem,index)=>(
                        <GridCard key={index} 
                            id={movieItem.id}
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
        </div>
    )
}

export default LandingPage
