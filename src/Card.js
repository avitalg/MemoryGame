import React, { useState } from 'react';
    import './Card.css';

function Card(props) {
    let [side, setSide] = useState("down");
    let clicked = () => {
        if(side === "down") setSide("up");
        if(side === "up") setSide("down");
        ;
    }
    return (
        <div className={"card " + props.side} onClick={()=>props.click(props.img, props.index)}>
            <img src={"images/" + props.img + ".png"} />
        </div>
    );
}

export default Card;
