// VoiceInput.js

import React, { useContext, useEffect, useRef } from 'react';
import { ChatContext } from '../context/ChatContext';
import { assets } from '../assets/assets'

const VoiceInput = () => {
    const { setInputValue } = useContext(ChatContext);
    const recognition = useRef(null);

    useEffect(() => {
        // Check for browser compatibility
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognition.current = new SpeechRecognition();
            recognition.current.continuous = false;
            recognition.current.lang = 'en-US';
            recognition.current.interimResults = false;
            recognition.current.maxAlternatives = 1;

            recognition.current.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                setInputValue(transcript);
            };

            // Optional: Handle error, no-speech, or session end scenarios
        } else {
            console.log("Speech Recognition API not supported.");
        }
        
        return () => {
            recognition.current && recognition.current.stop();
        };
    }, [setInputValue]);

    const startListening = () => {
        recognition.current && recognition.current.start();
    };

    const stopListening = () => {
        recognition.current && recognition.current.stop();
    };

    return (
        <img 
            src={assets.mic_icon} // Update path to your microphone icon
            alt="Microphone" 
            onMouseDown={startListening}
            onMouseUp={stopListening}
            onTouchStart={startListening}
            onTouchEnd={stopListening}
            style={{cursor: 'pointer'}}
        />       
    );
};

export default VoiceInput;
