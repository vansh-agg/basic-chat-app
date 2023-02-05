import React, { useState, useEffect } from 'react'
import './App.css'
import ScrollToBottom from "react-scroll-to-bottom"

const Chat = ({ socket, username, room }) => {
    const [currentmessage, setcurrentmessage] = useState("")
    const [messagelist, setmessagelist] = useState([])
    const sendmessage = async () => {
        if (currentmessage !== "") {
            const messagedata = {
                room: room,
                author: username,
                message: currentmessage,
                time: new Date(Date.now()).getHours() +
                    ":"
                    + new Date(Date.now()).getMinutes(),
            }
            await socket.emit("send_message", messagedata)
            setmessagelist((list) => [...list, messagedata])
            setcurrentmessage("")
        }
    }
    useEffect(() => {
        socket.on("recieve_message", (data) => {
            setmessagelist((list) => [...list, data])
        })
    }, [socket])
    return (
        <div className='chat-window'>
            <div className='chat-header'>
                <p>Live Chat</p>
            </div>
            <div className='chat-body'>
                <ScrollToBottom className='message-container'>
                    {messagelist.map((mes) => {
                        return <div className='message' id={username === mes.author ? "other" : "you"}>
                            <div>
                                <div className='message-content'>
                                    <p>{mes.message}</p>
                                </div>
                                <div className='message-meta'>
                                    <p id="time">{mes.time}</p>
                                    <p id="author">{mes.author}</p>
                                </div>
                            </div>
                        </div>
                    })}
                </ScrollToBottom>
            </div>
            <div className='chat-footer'>
                <input type="text"
                    value={currentmessage}
                    placeholder='Hey..'
                    onChange={(event) => { setcurrentmessage(event.target.value) }}
                    onKeyPress={(event) => { event.key === "Enter" && sendmessage() }}
                />
                <button onClick={sendmessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat