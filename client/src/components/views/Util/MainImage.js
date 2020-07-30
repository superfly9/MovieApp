import React from 'react'

function MainImage(props) {
    console.log('at Maing Image',props)
    return (
        <div style={{display:'flex',margin:'2rem 0'}}>
            <div>
                <img src={props.image} style={{width:'41vw',height:'70vh',borderRadius:'10px'}}/>
            </div>
            <div style={{maxWidth:'700px',marginLeft:'2rem'}}>
                <div style={{display:'flex',alignItems:'center'}}>
                    <h2 style={{color:'black',marginRight:'1rem'}}>{props.title}</h2>
                    <h3>{props.release_date}</h3>
                </div>
                <div style={{fontSize:'1rem',fontWeight:'500'}}>
                    <span style={{marginRight:'1rem'}}>Rating:{props.vote_average}</span>
                    <span>Vote:{props.vote_count}</span>
                </div>
                <p style={{color:'black',fontSize:'1rem',marginTop:'2rem'}}>{props.description}</p>
            </div>
        </div>
    )
}

export default MainImage
