import React, { useState } from 'react';
    import './Card.css';

function Card(props) {
    
    return (
        <div className={"card " + props.side} onClick={()=>props.click(props.img, props.index, props.found)}>
            <img src={"images/" + props.img + ".png"} />
        </div>
    );
}

export default Card;
