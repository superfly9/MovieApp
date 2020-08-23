import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { API_URL,API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../Util/MainImage';
import {Row} from 'antd';
import GridCard from '../Util/GridCard';
import MovieInfo from './Sections/MovieInfo';
import './VideoDetail.css';
import Favorite from './Sections/Favorite';
import Comment from './Sections/Comment';
import { useSelector } from 'react-redux';

function VideoDetail(props) {
    const {match : {params : {movieId}}} = props;
    const [MovieDetailInfo,setMovieDetailInfo] = useState({});
    const [CrewInfo,setCrewInfo] = useState([]);
    const [ToggleActor,setToggleActor] = useState(false);
    const [CommentList,setCommentList] = useState([]);
    const user = useSelector(state=>state.user);
    const {userData : { _id:userId}} = user;

    useEffect(()=>{
        let detailInfoEndpoint = `${API_URL}${movieId}?api_key=${API_KEY}&language=ko`;
        let crewInfoEndPoint = `${API_URL}${movieId}/credits?api_key=${API_KEY}`;
        Axios.get(detailInfoEndpoint)
            .then(response=>{
                setMovieDetailInfo({...response.data})
            })
        
        Axios.get(crewInfoEndPoint)
            .then(response=>{
                setCrewInfo([...response.data.cast.splice(0,12)])
            })

        Axios.post('/comment/getComment',{movieId})
            .then(response=>{
                if (response.data.success) {
                    setCommentList(response.data.commentList);
                } else {
                    alert('댓글을 가져오는 데 실패했습니다.');
                }
            })
    },[]);
    const actorToggleHandler =()=>setToggleActor(!ToggleActor);
    const commentUpdate = (newComment)=>{
        if (newComment && newComment.length>=0) {
            setCommentList([...newComment]) 
        } else {
            setCommentList([...CommentList,newComment]);
        }
    }
    return (
        <div className='detail_container'>

            {MovieDetailInfo.poster_path&&<MainImage 
                backImage={`${IMAGE_BASE_URL}w1280${MovieDetailInfo.backdrop_path}`}
                image={`${IMAGE_BASE_URL}w1280${MovieDetailInfo.poster_path}`} 
                release_date={MovieDetailInfo.release_date}
                vote_average={MovieDetailInfo.vote_average}
                vote_count = {MovieDetailInfo.vote_count}
                title={MovieDetailInfo.original_title} 
                description={MovieDetailInfo.overview}
            />}
            <div>
            
                {userId&&<Favorite movieId={movieId} movieInfo={MovieDetailInfo}/>}
                <MovieInfo movie={MovieDetailInfo} />    
    
                {ToggleActor &&
                    <Row lg={6} md={8} xs={24} gutter={[16,16]}>
                        {CrewInfo && CrewInfo.map((crewInfo,index)=>(
                            <GridCard 
                                key={index}
                                name={crewInfo.name}
                                character={crewInfo.character}
                                image={crewInfo.profile_path?`${IMAGE_BASE_URL}w500/${crewInfo.profile_path}`:`/uploads/img/noImage.png` }
                            />
                        ))}
                    </Row>
                }
                <br />
                <div className='toggle_container'>
                    <button className='toggle_btn' onClick={actorToggleHandler}>출연배우 목록</button>
                </div>
                <Comment movieId={movieId} commentList={CommentList} commentUpdate={commentUpdate} />
            </div>
        </div>
    )
}

export default VideoDetail
