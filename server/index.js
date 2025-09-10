import express from 'express';
import "dotenv/config";
import mongoose from 'mongoose';
import cors from 'cors';
import {createServer} from "http"
import { InitialiseSocketio, getIO } from './middleware/socketio.js';
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
import { updateBay } from './controller/yardController.js';
import {logger} from './middleware/logger.js';

//app.use(logger)

const app = express();
const httpServer = createServer(app);
InitialiseSocketio({server:httpServer})



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);




app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}))
app.use(cors({origin: ["http://localhost:3000", "https://trailer-tracker.onrender.com"], credentials:true}));
app.use(cookieParser())
const mongoDb = "mongodb+srv://ruslangyurov:UPhkK4FkI2nVFUii@oucluster.dqizjw9.mongodb.net/?retryWrites=true&w=majority"

// app.use('/', express.static(path.join(__dirname, 'public')))

// app.use(logger)



const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0'
httpServer.listen(PORT, HOST);


mongoose.connect(mongoDb).then(() => console.log(
    `server is runnin on port ${PORT}`
)).catch(err => console.log(err))



  
 app.use('/', defaultRoute)
 app.use('/yard', yardRoute)
 app.use('/user', userRoute)
 app.use('/auth', userAuthRoute)
 
 // Catch-all error handler
app.use((err, req, res, next) => {
  console.error(err.stack); // logs the error for debugging
  const status = err.status || 500; // default to 500 if not set
  const message = err.message || "Something went wrong!";
  res.status(status).json({ message });
});

  