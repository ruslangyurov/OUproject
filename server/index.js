import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import {Server} from 'socket.io';
const app = express();
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import router from './routes/bayRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}))
app.use(cors());
const mongoDb = "mongodb+srv://ruslangyurov:UPhkK4FkI2nVFUii@oucluster.dqizjw9.mongodb.net/?retryWrites=true&w=majority"

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT);
const io = new Server(server);
export default io;


mongoose.connect(mongoDb).then(() => console.log(
    `server is runnin on port ${PORT}`
)).catch(err => console.log(err))

io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Send existing messages to the connected client
    Message.find().then((messages) => {
      socket.emit('init', messages);
    });
  
    // Listen for new messages from the client
    socket.on('message', (msg) => {
      const message = new Message(msg);
      message.save().then(() => {
        io.emit('message', message); // Broadcast the message to all connected clients
      });
    });
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
  
 
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
   });



