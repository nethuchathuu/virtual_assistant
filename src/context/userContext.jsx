import React, { createContext } from 'react';
import run from "../gemini.js"; 

export const DataContext = createContext();

function UserContext({ children }) {
    function speak(text) {
        let text_speak = new SpeechSynthesisUtterance(text);
        text_speak.volume = 1;
        text_speak.rate = 1;
        text_speak.pitch = 1;
        text_speak.lang = "en-GB"; // Corrected language code
        window.speechSynthesis.speak(text_speak);
    }

    async function aiResponse(prompt) {
        try {
            let text = await run(prompt); // Call run function
            console.log(text); // Log AI response to console
        } catch (error) {
            console.error("Error in AI Response:", error);
        }
    }

    let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new speechRecognition();

    recognition.onresult = (e) => {
        let current = e.resultIndex; 
        let transcript = e.results[current][0].transcript; // Use 'current' instead of 'currentIndex'
        console.log(transcript);
        aiResponse(transcript);
    };
    

    let value = { 
        recognition
     }; // Include speak function in the context value

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}

export default UserContext;
