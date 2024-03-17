import React, { useContext, useState } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { ChatContext } from '../../../context/ChatContext';

const Main = () => {
  
const {inputValue, setInputValue, response, sendPrompt, showResult, loading, recentPrompt} = useContext(ChatContext);



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
            </div>
            }

            

            <div className="main-bottom">
                <div className="search-box">
                    <input type="text" placeholder='Enter a prompt here' value={inputValue} onChange={e=>setInputValue(e.target.value)}/>
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        <img src={assets.send_icon} alt="" onClick={() => sendPrompt(inputValue)}/>
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