import React, { useState } from "react";
import './Card.css';
import flashcards from '../flashcards.json';

const Card = (props) => {

    const index = props.index;
    const mode = props.mode;
    const randomFlashcard = flashcards[index];
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
        <div className={`card ${difficultyClass}`} onClick={props.onClick}  >

        {content}

        </div>
    )
}

export default Card;