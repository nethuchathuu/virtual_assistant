import React, { createContext } from 'react';

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

    let value = { speak }; // Include speak function in the context value

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}

export default UserContext;
