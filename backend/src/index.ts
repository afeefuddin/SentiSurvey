import dotenv from "dotenv"
dotenv.config()
import express from "express"
import { Server } from "socket.io";
import { createServer } from "node:http"

const app = express();
const server = createServer(app);
const io = new Server(server)

io.on('connection', (socket) => {
    console.log('a user connected');
});



app.listen(8000,()=>{
    console.log("Server Started")
})