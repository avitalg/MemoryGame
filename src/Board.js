import React, { useState } from 'react';
import './Board.css';
import Card from './Card';

function GameBoard() {
    let [cards, setCards] = useState([{img:"flower", side:"down"}, 
    {img:"flower", side:"down"}, 
    {img:"flower2", side:"down"}, 
    {img:"flower2", side:"down"}, 
    {img:"flower3", side:"down"}, 
    {img:"flower3", side:"down"}]);

    let shuffle = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
    shuffle(cards);

    let checkCard = (name, key, side) => {
        if(localStorage.getItem("selectedKey") == key){
            return;
        }
        if(!localStorage.getItem("selected")){
            localStorage.setItem("selected", name);
            localStorage.setItem("selectedKey", key);
            return;
        }
        if (localStorage.getItem("selected") && localStorage.getItem("selected") !== name) {
            localStorage.setItem("selected", "");
            console.log(false);
            return;
        }

        if(localStorage.getItem("selected") === name){
            console.log(true);
            localStorage.setItem("selected", "");
            localStorage.setItem("selectedKey", "");
            return;
        }
    }

    return (
        <React.Fragment>
            <h1>
                Memory Game
            </h1>
            <div className="game-board">
                {cards.map((item, index) =>
                    <Card {...item} sidekey={index} index={index} click={checkCard} />
                )}
            </div>
        </React.Fragment>
    );
}

export default GameBoard;
