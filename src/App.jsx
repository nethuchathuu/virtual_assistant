import React, { useContext } from 'react';
import "./App.css";
import { CiMicrophoneOn } from "react-icons/ci";
import { DataContext } from './context/userContext';

function App() {
  const { speak } = useContext(DataContext);

  return (
    <div className="main">
      <span>I am Talko, Your Advanced Virtual Assistant</span>
      <button onClick={() => speak("Hello, how can I assist you?")}>
        Click here <CiMicrophoneOn />
      </button>
    </div>
  );
}

export default App;
