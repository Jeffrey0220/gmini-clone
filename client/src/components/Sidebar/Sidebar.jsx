import React, { useState, useContext } from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { ChatContext } from '../../../context/ChatContext';

const Sidebar = () => {
    const [extended, setExtended]=useState(false);
    const {sendPrompt, prevPrompts, newChat, setRecentPrompt, setPrevPrompts}= useContext(ChatContext)


  return (
    <div className='sidebar'>
        <div className="top">
            <img src={assets.menu_icon} alt="" className="menu" onClick={()=>setExtended(prev=>!prev)}/>
            <div className="new-chat" onClick={()=>newChat()}>
                <img src={assets.plus_icon} alt=""/>
                {extended ? <p>New Chat</p>:null}
            </div>
            {extended?<div className="recent">
                <p className="recent-title">Recent</p>
                {prevPrompts.map((item, index)=>{
                return (
                <div key={index} className="recent-entry" onClick={()=>sendPrompt(item)}>
                    <img src={assets.message_icon} alt="" />
                    <p>{item.slice(0,18)} ...</p>
                    <span className="tooltip-text">{item}</span>
                </div>
                )
                })}
                
            </div>:null}

        </div>
        <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.question_icon} alt="" />
                {extended?<p>Help</p>:null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt="" />                
                {extended?<p>Activity</p>:null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.setting_icon} alt="" />               
                {extended?<p>Settings</p>:null}
            </div>

        </div>
    </div>
  )
}

export default Sidebar