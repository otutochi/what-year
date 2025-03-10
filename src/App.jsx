import { useState } from 'react';
import './App.css';
import Card from './components/Card';
import flashcards from './flashcards.json';



const App = () => {

  const getRandomIndex = () => Math.floor(Math.random() * (flashcards.length - 1));

  const [flashCards, setFlashCards] = useState(flashcards);

  const shuffleCards = () => {
    let shuffledCards = [...flashcards];
    for(let i=flashcards.length -1 ; i > 0 ; i--){
      const j = Math.floor(Math.random() * (i+1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }

    setFlashCards(shuffledCards);
  }

  const handleShuffle = () => {
    shuffleCards();
    setIndex(0);
    setMode("event");

  }

  const [index, setIndex] = useState(0);

  const [guess, setGuess] = useState("");

  const [checkGuess, setCheckGuess] =useState("");

  const handleGuess = (e) => {
    setGuess(e.target.value);
  }

  const submitGuess = () => {
    if(guess != flashCards[index].year){
      setCheckGuess("wrong");
    } else {
      setCheckGuess("correct");
    }
  }

  
  const prevIndex = () => {
    setIndex(index - 1); 
    setMode("event");
  }

  const nextIndex = () => {
    setIndex(index + 1); 
    setMode("event");
  }

  const randomIndex = () => {
    setIndex(getRandomIndex()); 
    setMode("event");
  }

  const [mode, setMode] = useState("start");

  const updateMode = () => {
    if(mode == "event"){
      setMode("year");
    } else {
      setMode("event");
    }
  }

  


  return (
    <div className="App">
      <h1>What Year?</h1>

      <p>How well do you know your history?</p>
      <p>Check if you can correctly guess the year each of these {flashcards.length} historical events happened</p>
      

      <Card currentFlashCard={flashCards[index]} mode={mode} onClick={updateMode}/>

      {mode != "start" && <input type="text" name="guess" value={guess} placeholder="Take a guess before flipping" onChange={handleGuess} className={checkGuess} />}
      {mode != "start" && <button onClick={submitGuess} >Submit</button>}

      {mode != "start" && index != 0 && <button onClick = {prevIndex} >Prev</button>}
      {mode != "start" && index != flashCards.length -1 && <button onClick = {nextIndex} >Next</button>}
      {mode != "start" && <button onClick = {randomIndex} >Random</button>}

      {mode != "start" && <button onClick={handleShuffle}>Shuffle Cards</button>}
      
    </div>
  )
}

export default App