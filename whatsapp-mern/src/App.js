import './App.css';
import React,{useEffect, useState} from "react";
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from "pusher-js"
import axios from "./axios";

function App() {

  const [messages,setMessages]=useState([]);

  //this fetches all the initial info
  useEffect(() => {
    axios.get('/messages/sync')
    .then(resopnse => {
        setMessages(resopnse.data);
    });
  }, []);

  //this code will run only once
  useEffect(() => {
    const pusher = new Pusher('c9c1e6e954f78324b956', {
      cluster: 'ap2'
    });

    //channel is link to our database where we push into
    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      //this will give an alert dialog whenever database is changed
      //alert(JSON.stringify(newMessage));
      //this add new message to all the existing messages
      setMessages([...messages,newMessage])
    });

    //this ensures that even messages changes we have only 1 subscriber
    return ()=>{
    channel.unbind_all();
    channel.unsubscribe();
  };
  }, [messages]);

  
  console.log(messages);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
