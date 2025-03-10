import React, { useState } from "react";
import './Card.css';

const Card = ({ currentFlashCard, mode, onClick }) => {

    
    const randomFlashcard = currentFlashCard;
    const difficultyClass = randomFlashcard.difficulty.toLowerCase();

    let content;

    if(mode == "event") {

        content = <div>
            <p>{randomFlashcard.event}</p>
            <img src={`images/${randomFlashcard.image}`} alt={randomFlashcard.event} />
        </div>

    } else if(mode == "year") {
        content = <div className="year" >
            <p>{randomFlashcard.year}</p>
        </div>
    } else if(mode == "start"){
        content = <div className="start">
            <p>Start</p>
        </div>
    }

    

    


    return (
        <div className={`card ${difficultyClass}`} onClick={onClick}  >

        {content}

        </div>
    )
}

export default Card;