// SpeakButton.jsx

import React from 'react';
import { assets } from '../assets/assets';

const SpeakButton = ({ textToSpeak }) => {
    if ('speechSynthesis' in window) {
        console.log('Speech synthesis supported.');
      } else {
        console.log('Speech synthesis not supported.');
      }

  const speakText = () => {
    // *******************
    window.speechSynthesis.cancel(); // Cancel any ongoing speeches
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <img 
      src={assets.speak_icon} // Update the path to your speak icon
      alt="Speak" 
      onClick={speakText}
      style={{ cursor: 'pointer', marginLeft: '10px' }} // Add styling as needed
    />
  );
};

export default SpeakButton;