import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile , MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useState } from 'react'
import "./Chat.css";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from "./axios";

function Chat({messages}) {

    const [input,setInput]=useState("");

    //this prevents the page from refreshing when we press RETURN on send message
    const sendMessage= async(e) =>{
        e.preventDefault();
        axios.post('/messages/new',{
            message: input,
            name: "Demo app",
            timestamp: "just now",
            received: false,
        });
        setInput('');
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src="https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
                <div className="chat__headerInfo">
                    <h3>Saurabh Prakash</h3>
                    <p>Last seen...</p>                
                </div>

                <div className="chat__headerRight"></div>
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
            </div>

            <div className="chat__body">

                {messages.map((message)=> (
                    <p className={`chat__message ${message.received && "chat__reciever"}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">
                        {message.timestamp}
                        </span>
                    </p>
            ))}
                
            </div>
            
            
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} 
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text"/>
                    <button onClick={sendMessage} 
                        type="submit">
                        Send a message
                    </button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
