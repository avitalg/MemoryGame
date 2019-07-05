import React, { useState, useEffect } from 'react';
import '../css/Board.css';
import Card from '../js/Card';

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

    useEffect(() => {
        setFinished(cards.length === cards.filter(item => item.found == true).length);
    }, [cards]);


    let cleanStorage = () => {
        localStorage.setItem("selected", "");
        localStorage.setItem("selectedKey", "");
    }

    //set first selection to the localstorage
    let firstSelected = (name, key, newCards) => {
        if (!localStorage.getItem("selected")) {
            localStorage.setItem("selected", name);
            localStorage.setItem("selectedKey", key);
            newCards[key].side = "up";
            setCards(newCards);
            return true;
        }
        return false;
    }

    // open the second card that was chosen
    let showSecondSelection = (key, newCards) => {
        if (newCards[key].side == "down" && newCards[localStorage.getItem("selectedKey")].side == "up") {
            newCards[key].side = "up";
            setCards(newCards);
        }
    }

    //if the second card doesn't match the first card - reset properties
    let dontMatch = (name, key, newCards) => {
        if (localStorage.getItem("selected") && localStorage.getItem("selected") !== name) {
            setTimeo(true);
            setTimeout(() => {
                newCards[key].side = "down";
                newCards[localStorage.getItem("selectedKey")].side = "down";
                cleanStorage();
                setCards([...newCards]);
                setTimeo(false);
            }, 1000);
            return true;
        }
        return false;
    }

    //if we found a match - save it
    let match = (name, key, newCards) => {
        if (localStorage.getItem("selected") === name) {
            setSuccess(true);
            setTimeo(true);
            setTimeout(() => {
                [newCards[key].found, newCards[localStorage.getItem("selectedKey")].found] = [true, true];
                cleanStorage();
                setCards([...newCards]);
                setSuccess(false);
                setTimeo(false);
            }, 1000);
        }
    }

    let checkCard = (name, key, found) => {
        let newCards = [...cards];
        if (localStorage.getItem("selectedKey") && localStorage.getItem("selectedKey") == key || found || timeo) {
            return;
        }

        if (firstSelected(name, key, newCards)) return;
        showSecondSelection(key, newCards);
        if (dontMatch(name, key, newCards)) return;
        match(name, key, newCards);
    }

    let feedback = () => {
        let text = "";
        if (success) {
            text = "GOOD JOB!";
        }
        if (finished) {
            text = "GAME OVER";
        }

        return <div className="good-job">{text}</div>;
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
            {feedback()}
        </React.Fragment>
    );
}

export default GameBoard;
