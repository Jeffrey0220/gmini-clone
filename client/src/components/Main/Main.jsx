import React, { useContext, useState, useRef } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { ChatContext } from '../../context/ChatContext';
import VoiceInput from '../../widgets/VoiceInput';
import SpeakButton from '../../widgets/SpeakButton';
import TranslationWidget from '../../widgets/TranslationWidget';

const Main = () => {
  
const {inputValue, setInputValue, response, sendPrompt, showResult, loading, recentPrompt} = useContext(ChatContext);
const [showWarning, setShowWarning] = useState(false);

const sendIconRef = useRef(null);


  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">

            {!showResult ? <>
                <div className="greet">
                <p><span>Hello, world</span></p>
                <p>How Can I help you</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest beautiful trip</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>good ideas</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Suggest beautiful trip</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>imporve code</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
            </> : <div className="result">
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>                    
                </div>

                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {loading?<div className="loader">LOADING...</div> : <p dangerouslySetInnerHTML={{ __html: response }}></p>}
                   
                </div>
                {response && <SpeakButton textToSpeak={response} />}
                {/* {response && <TranslationWidget />} */}
            </div>
            }

            

            <div className="main-bottom">
            {showWarning && <p className="warning">Please enter you question</p>}
                <div className="search-box">
                
                    <textarea type="text" required="required" placeholder='Enter a prompt here' value={inputValue} 
                    onChange={e=>setInputValue(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault(); // Prevent default to avoid newline in textarea                           
                            sendIconRef.current.click();                         
                        }
                      }}
                      rows="1"
                      />

                    <div>
                        <img src={assets.gallery_icon} alt="" />

                       <VoiceInput />

                        <img src={assets.send_icon} alt=""
                        ref={sendIconRef}
                        onClick={() => {
                            if (!inputValue.trim()) {
                              setShowWarning(true);
                            } else {
                              setShowWarning(false);
                              sendPrompt(inputValue);
                            }
                          }}/>
                    </div>                 
                </div>
                <p className="bottom-info">
                        Gemini may display inaccurate info
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main