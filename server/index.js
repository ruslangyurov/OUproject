import express from 'express';
import "dotenv/config";
import mongoose from 'mongoose';
import cors from 'cors';
import {createServer} from "http"
import {Server} from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
//import * as bodyParser from 'body-parser'
import {connectDB} from './config/DBcon.js';
import { defaultRoute } from './routes/root.js';
//import {logger} from './middleware/logger.js';
import yardRoute from './routes/yardRoute.js';
import userAuthRoute from './routes/userAuthRoute.js';
import userRoute from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import * as path from 'path';

//app.use(logger)

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}))
app.use(cors({origin: "http://localhost:3000", credentials:true}));
app.options('*', cors());
app.use(cookieParser())
const mongoDb = "mongodb+srv://ruslangyurov:UPhkK4FkI2nVFUii@oucluster.dqizjw9.mongodb.net/?retryWrites=true&w=majority"

app.use('/', express.static(path.join(__dirname, 'public')))



const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";
httpServer.listen(PORT, HOST);


mongoose.connect(mongoDb).then(() => console.log(
    `server is runnin on port ${PORT}`
)).catch(err => console.log(err))

const onConnection = (socket) => {
    bayUpdateHandler(io, socket)
}

io.on("connection", (socket) => {
    console.log("A new user is connected.")
})
  
 app.use('/', defaultRoute)
 app.use('/yard', yardRoute)
 app.use('/user', userRoute)
 app.use('/auth', userAuthRoute)
 
 
  