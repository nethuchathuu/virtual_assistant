import React, { useContext } from 'react';
import "./App.css";
import { CiMicrophoneOn } from "react-icons/ci";
import { DataContext } from './context/userContext';
import speakimg from "./images/200w.gif";
import aigif from "./images/aiv-unscreen.gif"


function App() {
  let { recognition, speaking, setSpeaking, prompt, setPrompt, response, setResponse, stopSpeaking } = useContext(DataContext);

  console.log(speakimg);

  return (
    <div className="main">
      <span>I am Talko, Your Advanced Virtual Assistant</span>
      
      {
  !speaking ? (
    <button onClick={() => {
      if (recognition) {
        setPrompt("listening...");
        setSpeaking(true);
        setResponse(false);
        recognition.start();
      } else {
        alert("Voice recognition not supported");
      }
    }}>
      Click here <CiMicrophoneOn />
    </button>  
  ) : (
    <div className='response'>
      {!response ? (
        <img src={speakimg} alt="" id="speak" />
      ) : (
        <img src={aigif} alt="" id="aigif" />
      )}
      <p>{prompt}</p>

      {/* ✨ Add this Stop Button */}
      <button onClick={stopSpeaking} className="stop-btn">
        Stop Response
      </button>
    </div>
  )
}

      
      
    </div>
  );
}

export default App;
