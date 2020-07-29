import React from 'react'

function MainImage(props) {
    return (
        <div style={{
            backgroundImage :`url(${props.image})`,
            height:'500px',
            backgroundSize:'100% cover',
            backgroundPosition:'center',
            position:'relative'
        }}>
            <div style={{position:'absolute',bottom:'2rem',maxWidth:'500px'}}>
                <h2 style={{color:'white'}}>{props.title}</h2>
                <p style={{color:'white',fontSize:'1rem'}}>{props.description}</p>
            </div>
        </div>
    )
}

export default MainImage
