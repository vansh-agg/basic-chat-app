import React, { useState } from 'react';
import './App.css';
import Chat from './Chat';
import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001")
function App() {
  const [username, setusername] = useState("")
  const [room, setroom] = useState("")
  const [showchat, setshowchat] = useState(false)

  const joinroom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room)
      setshowchat(true)
    }
  }
  return (
    <div className="App">
      {!showchat ? (
        <div className='joinChatContainer'>
          <h3>Welcome Chatters!</h3>
          <input
            type="text"
            placeholder='Name...'
            onChange={(event) => { setusername(event.target.value) }}

          />
          <input
            type="text"
            placeholder='Room name...'
            onChange={(event) => { setroom(event.target.value) }}
          />
          <button onClick={joinroom}>Join Room</button>
        </div>) : (
        <Chat
          socket={socket}
          username={username}
          room={room}

        />)}

    </div>
  );
}

export default App;
