import React from 'react'
import { Descriptions } from 'antd';
import '../VideoDetail.css';

function MovieInfo(props) {
    const {movie :{ 
        title,
        release_date,
        revenue,
        runtime,
        vote_count,
        status,
        popularity,
        tagline
    }} = props;
    console.log(popularity)

    let changeDollartoWon;
    if (revenue) {
        let arr = `${revenue*1200}`.split('');
        changeDollartoWon = arr.map((target,index)=>{
            if (index%3===2) arr[index] =`,${arr[index]}`  
            return arr[index];
        }).join('');
    }
    
    return (
        <div className='info_container'>
            {popularity &&
            <Descriptions title="영화 정보" bordered>
                <Descriptions.Item label="제목">{title}</Descriptions.Item>
                <Descriptions.Item label="개봉 날짜">{release_date}</Descriptions.Item>
                <Descriptions.Item label="수익">{revenue ? `${changeDollartoWon}원`:'수익 기록이 없습니다.'}</Descriptions.Item>

                <Descriptions.Item label="상영시간">{runtime}분</Descriptions.Item>
                <Descriptions.Item label="좋아요 수">{vote_count}표</Descriptions.Item>
                
                <Descriptions.Item label="개봉 여부">{status==='Released' ? '개봉완료':'개봉 예정작'}</Descriptions.Item>
                <Descriptions.Item label="인기도">{Math.floor(popularity)}</Descriptions.Item>
                <Descriptions.Item label="요약">{tagline ? tagline : '요약 내용이 없습니다.'}</Descriptions.Item>
            </Descriptions>
            }
        </div>
    )
}

export default MovieInfo
