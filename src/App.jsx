import { useState } from 'react';
import './App.css';
import Card from './components/Card';
import flashcards from './flashcards.json';



const App = () => {

  

  const [flashCards, setFlashCards] = useState(flashcards);

  const [masteredCards, setMasteredCards] = useState([]);

  const [viewingMastered, setViewingMastered] = useState(false);

  const [hasGuessed, setHasGuessed] = useState(false);

  const shuffleCards = () => {
    let shuffledCards = [...flashCards];
    for(let i=flashCards.length -1 ; i > 0 ; i--){
      const j = Math.floor(Math.random() * (i+1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }

    setFlashCards(shuffledCards);
  }

  const masterCard = () => {

    if(!viewingMastered) {
      setMasteredCards(prev => [...prev, flashCards[index]]);
      setFlashCards(prev => {
        if(prev.length == 1){
          setViewingMastered(true);
        }
        return prev.filter((_, i) => i != index);
      })
      setMode("event");
      setGuess("");
      setCheckGuess("");
      setHasGuessed(false);
        
    
    } else {
      setFlashCards(prev => [...flashCards, masteredCards[index]]);
      setMasteredCards(prev => {
        if(prev.length == 1) {
          setViewingMastered(false);
        }
        return prev.filter((_, i) => i != index);
      })
      setMode("event");
      setGuess("");
      setCheckGuess("");
      setHasGuessed(false);
    }

  }

  const toggleMastered = () => {
    if(!viewingMastered && masteredCards.length != 0){
      setViewingMastered(!viewingMastered);
      setIndex(0);
      setMode("event");
      setGuess("");
      setCheckGuess("");
      setHasGuessed(false);
    }
    if(viewingMastered && flashCards.length != 0){
      setViewingMastered(!viewingMastered);
      setIndex(0);
      setMode("event");
      setGuess("");
      setCheckGuess("");
      setHasGuessed(false);
    }
    
  }

  const handleShuffle = () => {
    shuffleCards();
    setIndex(0);
    setMode("event");
    setGuess("");
    setCheckGuess("");
    setHasGuessed(false);

  }

  

  const [index, setIndex] = useState(0);

  const [guess, setGuess] = useState("");

  const [checkGuess, setCheckGuess] =useState("");

  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const handleGuess = (e) => {
    setGuess(e.target.value);
  }

  const submitGuess = () => {
    if(Math.abs(guess - flashCards[index].year) > 2){
      setCheckGuess("wrong");
      setCurrentStreak(0);
    } else {
      setCheckGuess("correct");
      setCurrentStreak(prevStreak => {
        const newStreak = prevStreak + 1;
        setLongestStreak(prevLongest => Math.max(newStreak, prevLongest));
        return newStreak;
      })
    }
    setHasGuessed(true);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      submitGuess();
    }
  };

  
  const prevIndex = () => {
    if(index > 0){
      setIndex(index - 1); 
      setMode("event");
      setGuess("");
      setCheckGuess("");
      setHasGuessed(false);
    }
  }

  const nextIndex = () => {
    if(index<(viewingMastered ? masteredCards.length : flashCards.length)-1)
    {
      setIndex(index + 1); 
      setMode("event");
      setGuess("");
      setCheckGuess("");
      setHasGuessed(false);
    }
  }

  const getRandomIndex = () => Math.floor(Math.random() * ((viewingMastered ? masteredCards.length : flashCards.length)));

  const randomIndex = () => {
    setIndex(getRandomIndex()); 
    setMode("event");
    setGuess("");
    setCheckGuess("");
    setHasGuessed(false);
  }

  const [mode, setMode] = useState("start");

  const updateMode = () => {
    if(mode == "event" && hasGuessed == true){
      setMode("year");
    } else {
      setMode("event");
    }
  }

  

  


  return (
    <div className="App">
      <h1>What Year?</h1>

      <p>How well do you know your history?</p>
      <p>Check if you can correctly guess the year each of these {flashcards.length} historical events happened. You can 'master' a card once you feel that you already know it.</p>
      
      <p>Current Streak: {currentStreak}, Longest Streak: {longestStreak}</p>
      
      <Card currentFlashCard={viewingMastered ? masteredCards[index] : flashCards[index]} mode={mode} onClick={updateMode}/>

      {mode != "start" && <p>Take a guess before flipping. A close enough answer (+/- 2 years) would do.</p>}

      {mode != "start" && <div>
        <div class="submitLine">
          <input type="text" name="guess" value={guess}  onChange={handleGuess} onKeyDown={handleKeyDown} className={checkGuess} />
          <button onClick={submitGuess} >Submit</button>
        </div>

        <div class="changeIndexLine">
          <button onClick = {prevIndex} disabled={index == 0} >Prev</button>
          <button onClick = {nextIndex} disabled={index == (viewingMastered ? masteredCards.length : flashCards.length)-1 } >Next</button>
          <button onClick = {randomIndex} >Random</button>
          <button onClick= {masterCard} >{viewingMastered ? "Unmaster Card" : "Master Card"}</button>
        </div>

        <div class="shuffleLine">
          <button onClick={handleShuffle}>Shuffle Cards</button>
          <button onClick={toggleMastered} disabled={(viewingMastered ? flashCards.length : masteredCards.length)==0} >{viewingMastered ? "Show Unmastered" : "Show Mastered"}</button> 
        </div>
      </div>}

      
    </div>
  )
}

export default App;