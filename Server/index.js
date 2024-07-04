import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'


const app = express()

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log(`Connected: ${socket.id}`);

    socket.on("send_message", (data) => {
        console.log(data.message);
        socket.broadcast.emit("recieve_message", data)
    })
})

server.listen(3001, () => {
    console.log("Server Online");
})
