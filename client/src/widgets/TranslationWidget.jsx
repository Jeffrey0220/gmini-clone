import React, { useState, useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Spanish' },
  // Add more languages as needed
];

const TranslationWidget = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const { response, setTranslatedResponse } = useContext(ChatContext); // Assuming you have setTranslatedResponse in your context

  const translateText = (text, targetLanguage) => {
    // Placeholder function for translation API call
    // This is where you would call the translation API and then set the translated response
    console.log(`Translating text to ${targetLanguage}`);
    // Assume we get "translatedText" from the API
    setTranslatedResponse(translatedText); // Update the context with the translated response
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    translateText(response, event.target.value);
  };

  return (
    <div>
      <select value={selectedLanguage} onChange={handleLanguageChange}>
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TranslationWidget;
