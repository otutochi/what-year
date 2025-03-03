import { useState } from 'react';
import './App.css';
import Card from './components/Card';
import flashcards from './flashcards.json';



const App = () => {

  const getRandomIndex = () => Math.floor(Math.random() * (flashcards.length - 1));

  const [index, setIndex] = useState(getRandomIndex())

  const updateIndex = () => {
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
      

      <Card index={index} mode={mode} onClick={updateMode}/>

      {mode != "start" && <button onClick = {updateIndex} >Next</button>}
      
    </div>
  )
}

export default App