import React, { createContext, useState, useEffect } from 'react';
import run from "../gemini.js"; 
import runRes, { stopAIResponse } from "../api/run";

export const DataContext = createContext();

function UserContext({ children }) {
    const [speaking, setSpeaking] = useState(false);
    const [recognition, setRecognition] = useState(null);
    let [prompt, setPrompt] = useState("listening...");
    let [response, setResponse] = useState(false);

    function speak(text) {
        window.speechSynthesis.cancel();
        let text_speak = new SpeechSynthesisUtterance(text);
        text_speak.volume = 1;
        text_speak.rate = 1;
        text_speak.pitch = 1;
        text_speak.lang = "en-GB";

        setSpeaking(true);

    
    text_speak.onend = () => {
        setSpeaking(false);
    }
        window.speechSynthesis.speak(text_speak);
    }

    async function aiResponse(prompt) {
        try {
            let text = await run(prompt.toLowerCase().split("talko").join("")); // ✅ remove wake word cleanly

    
            // Clean the text and replace brand name
            let cleanedText = text.replace(/google/gi, "Nethu Tharuka").replace(/\*/g, "");
    
            setPrompt(cleanedText);
            speak(cleanedText);
            setResponse(true);
    
            
        } catch (error) {
            console.error("Error in AI Response:", error);
        }
    }
    

    useEffect(() => {
        if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
            console.error("Speech recognition not supported in this browser.");
            return;
        }

        let speechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        speechRecognition.continuous = false;
        speechRecognition.interimResults = false;
        speechRecognition.lang = "en-US";

        speechRecognition.onresult = (e) => {
            let transcript = e.results[0][0].transcript;
            setPrompt(transcript);
            takeCommand(transcript.toLowerCase());
        };

        function takeCommand(command){
            if(command.includes("open") && command.includes("youtube")){
                window.open("https://www.youtube.com/", "_blank");
                speak("opening Youtube...");
                setResponse(true);
                setPrompt("opening Youtube...");
                setTimeout(() => {
                    setSpeaking(false);
                }, 5000);
            }
            else if(command.includes("time")){
                let time = new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"});
                speak(time);
                setResponse(true);
                setPrompt(time);
                setTimeout(() => {
                    setSpeaking(false);
                }, 5000);
            }
            else if(command.includes("date")){
                let date = new Date().toLocaleString(undefined,{day:"numeric",month:"short"});
                speak(date);
                setResponse(true);
                setPrompt(date);
                setTimeout(() => {
                    setSpeaking(false);
                }, 5000);
            }
            else{
                aiResponse(command);
            }
        }

        speechRecognition.onerror = (e) => {
            console.error("Speech Recognition Error:", e.error);
        };

        setRecognition(speechRecognition);

        return () => {
            speechRecognition.abort();
        };
    }, []);

    const value = { 
        recognition,
        speaking,
        setSpeaking,
        prompt,
        setPrompt,
        response,
        setResponse,
        stopSpeaking
    };

    function stopSpeaking() {
        window.speechSynthesis.cancel();  // 🔇 Stop voice
        stopAIResponse();                 // 🛑 Stop AI response
        setSpeaking(false);              
        setPrompt("Response stopped.");
        setResponse(false);
    }
    

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}

export default UserContext;
