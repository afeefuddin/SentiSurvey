import dotenv from "dotenv"
dotenv.config()
import express from "express"
import { Server } from "socket.io";
import { createServer } from "node:http"
import { router } from "./routes/router";
import cors from 'cors'
import cookieParser from "cookie-parser"

const app = express();
const server = createServer(app);
const io = new Server(server)

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(cors(({credentials: true, origin: true})))

io.on('connection', (socket) => {
    console.log('a user connected');
});

app.use("/api/v1",router)

app.listen(8000,()=>{
    console.log("Server Started")
})