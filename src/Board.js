import React, { useState, useEffect } from 'react';
import './Board.css';
import Card from './Card';

function GameBoard() {
    const [cards, setCards] = useState([{ img: "flower", side: "down", found: false },
    { img: "flower", side: "down", found: false },
    { img: "flower2", side: "down", found: false },
    { img: "flower2", side: "down", found: false },
    { img: "flower3", side: "down", found: false },
    { img: "flower3", side: "down", found: false }]);
    const [success, setSuccess] = useState(false);
    const [finished, setFinished] = useState(false);
    const [timeo, setTimeo] = useState(false);

    useEffect(() => {
        cleanStorage();
        let shuffle = (arr) => {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        }
        setCards(shuffle([...cards]));
    }, []);

    useEffect(()=>{
        setFinished(cards.length === cards.filter(item=>item.found==true).length);
    }, [cards]);

    
    let cleanStorage = () =>{
        localStorage.setItem("selected", "");
        localStorage.setItem("selectedKey", "");
    }

    let checkCard = (name, key, found) => {
        let newCards = [...cards];
        if (localStorage.getItem("selectedKey") && localStorage.getItem("selectedKey") == key || found || timeo) {
            return;
        }

        //set first selection to the localstorage
        if (!localStorage.getItem("selected")) {
            localStorage.setItem("selected", name);
            localStorage.setItem("selectedKey", key);
            newCards[key].side = "up";
            setCards(newCards);
            return;
        }

        if (newCards[key].side == "down" && newCards[localStorage.getItem("selectedKey")].side == "up") {
            newCards[key].side = "up";
            setCards(newCards);
        }

        //the second card doesn't match the first card
        if (localStorage.getItem("selected") && localStorage.getItem("selected") !== name) {
            setTimeo(true);
            setTimeout(() => {
                newCards[key].side = "down";
                newCards[localStorage.getItem("selectedKey")].side = "down";
                cleanStorage();
                setCards([...newCards]);
                setTimeo(false);
                console.log(false);
            }, 1000);
            return;
        }

        if (localStorage.getItem("selected") === name) {
            console.log(true);
            setSuccess(true);
            setTimeo(true);
            setTimeout(() => {
                [newCards[key].found, newCards[localStorage.getItem("selectedKey")].found] = [true, true];
                cleanStorage();
                setCards([...newCards]);
                setSuccess(false);
                setTimeo(false);
            }, 1000);
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
                    <Card {...item} key={index} index={index} click={checkCard} />
                )}
            </div>
            {(success)? <div className="good-job">GOOD JOB!</div>:null}
            {(finished)? <div className="good-job">GAME OVER</div>:null}

        </React.Fragment>
    );
}

export default GameBoard;
