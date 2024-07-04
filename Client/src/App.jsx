import { useEffect, useState } from 'react'
import './App.css'
import io from 'socket.io-client'

// Connetion to Backend
const socket = io.connect("http://localhost:3001")

function App() {

  const [message, setMessage] = useState('')
  const [messageRecieved, setMessageRecieved] = useState('')

  function sendMessage() {
    socket.emit("send_message", { message })
  }

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageRecieved(data.message)
    })
  }, [socket])


  return (
    <>
      <div className='app'>
        <input placeholder='Message...' onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessage}>Send Message</button>
        <h1>Message</h1>
        {messageRecieved}
      </div>
    </>
  )
}

export default App
