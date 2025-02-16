import react from 'react';
import {Server} from 'socket.io';

let io;

const InitialiseSocketio = ({server}) => {
    io = new Server(server, {cors: {origin:"*", credentials:true}})

    io.on("connection", (socket) => {
        console.log("New user connected.")
    })

    socket.on("disconnect", () => {
        console.log("User disconnected")
    })
}

const getIO = () => {
    if (!io) throw new Error("Socket doesn't exist.")
    return io;
}

export {InitialiseSocketio, getIO};