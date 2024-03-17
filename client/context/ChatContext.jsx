import React, { createContext, useState } from "react";
import runChat from "../src/config/gemini";

export const ChatContext=createContext();

// Function to replace **text** with <b>text</b>
const formatText = (text) => {
    const regex = /\*\*(.*?)\*\*/g;

    const formattedText = text.replace(regex, (match, p1) => {
            return `<b>${p1}</b>`; // No <br/> before the first <b>
    });
    return formattedText;
  };



const ChatContextProvider=(props)=>{

    const [inputValue, setInputValue]=useState('');
    const [recentPrompt, setRecentPrompt]= useState("");
    const [prevPrompts, setPrevPrompts]= useState([]);
    
    const [response, setResponse] = useState("");
    const [showResult, setShowResult]=useState(false);
    const [loading, setLoading]=useState(false);

    const typingEffect=(index, nextWord)=>{
        setTimeout(()=>{
            setResponse(prev=>prev+nextWord+" ");
        },75*index)
    }
    

    const newChat=()=>{
        setLoading(false)
        setShowResult(false)
    }

    const sendPromptToBackend = (prompt) => {
      console.log('Sending prompt to backend:', prompt);
      setLoading(true);
      setShowResult(true);
      setRecentPrompt(prompt);
      setPrevPrompts(prev => {
        // First, filter out the existing prompt if it's already in the array
        const filteredPrev = prev.filter(p => p !== prompt);
        // Then, add the new prompt to the array
        return [...filteredPrev, prompt].reverse();
      });

      // Reset the response state to an empty string before fetching new data
      setResponse("");

      fetch('http://localhost:5000/', { // Make sure the endpoint is correct
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Received data:', data);
        const result=formatText(data.response);
        let resultArray=result.split(" ");
        for(let i=0; i<resultArray.length; i++){
            const nextWord= resultArray[i];
            typingEffect(i, nextWord);
        }
       // setResponse(result); // Assuming data.response contains the response you want to display
        setLoading(false);
        setInputValue("")
      })
      .catch(error => console.error('Error:', error));
    };

  
    const chatContextValue = {
        newChat,
        showResult,
        loading,
        inputValue, 
        setInputValue,
        prevPrompts, 
        setPrevPrompts,
        recentPrompt, 
        setRecentPrompt,
        response,
        sendPrompt: sendPromptToBackend,
    };



    return (
        <ChatContext.Provider value={chatContextValue}>
            {props.children}
        </ChatContext.Provider>
    )
}

export default ChatContextProvider