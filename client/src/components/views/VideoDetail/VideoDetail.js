import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../Util/MainImage';
import {Row} from 'antd';
import GridCard from '../Util/GridCard';
import MovieInfo from './Sections/MovieInfo';
import './VideoDetail.css';
import Favorite from './Sections/Favorite';

function VideoDetail(props) {
    const {match : {params : {movieId}}} = props;
    const [MovieDetailInfo,setMovieDetailInfo] = useState({});
    const [CrewInfo,setCrewInfo] = useState([]);
    const [ToggleActor,setToggleActor] = useState(false);
    console.log('movieId:',movieId)
    useEffect(()=>{
        let detailInfoEndpoint = `${API_URL}${movieId}?api_key=${API_KEY}&language=ko`;
        let crewInfoEndPoint = `${API_URL}${movieId}/credits?api_key=${API_KEY}`;
        Axios.get(detailInfoEndpoint)
            .then(response=>{
                console.log(response.data)
                setMovieDetailInfo({...response.data})
            })
        
        Axios.get(crewInfoEndPoint)
            .then(response=>{
                //20개만 담자,profile_path없는 배우들 다른 이미지 넣어주기
                setCrewInfo([...response.data.cast.splice(0,6)])
            })
    },[]);
    const actorToggleHandler =()=>setToggleActor(!ToggleActor);
    return (
        <div style={{width:'85%',margin:'1rem auto'}}>

            {MovieDetailInfo &&<MainImage 
                image={`${IMAGE_BASE_URL}w1280${MovieDetailInfo.poster_path}`} 
                release_date={MovieDetailInfo.release_date}
                vote_average={MovieDetailInfo.vote_average}
                vote_count = {MovieDetailInfo.vote_count}
                title={MovieDetailInfo.original_title} 
                description={MovieDetailInfo.overview}
            />}
            <div>
                {/* Movie Info */}
            
                <Favorite movieId={movieId} movieInfo={MovieDetailInfo}/>
                {/* movieTitle,posterPath를 Favorite에 왜 줘야 하는지 생각해봐야 */}
                <MovieInfo movie={MovieDetailInfo} />    
    
                {/* Actor List */}
                {ToggleActor &&
                    <Row lg={6} md={8} xs={24} gutter={[16,16]}>
                        {CrewInfo && CrewInfo.map((crewInfo,index)=>(
                            <GridCard 
                                key={index}
                                image={`${IMAGE_BASE_URL}w500/${crewInfo.profile_path}`}
                            />
                        ))}
                    </Row>
                }
                <br />
                <div style={{display:'flex',justifyContent:'center',margin:'2rem'}}>
                    <button onClick={actorToggleHandler}>Toggle Actor</button>
                </div>
            </div>
        </div>
    )
}

export default VideoDetail
