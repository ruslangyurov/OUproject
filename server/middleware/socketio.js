import { Server } from 'socket.io';
import { updateBay, updateTrestle } from '../controller/yardController.js';
import {getAllBays} from '../controller/yardController.js'

let io;

const InitialiseSocketio = ({ server }) => {
    io = new Server(server, { cors: { origin: "*", credentials: true }, transports: ['websocket'] });

    io.on("connection", (socket) => {
        console.log("New user connected:", socket.id);

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
        socket.on("requestBays", async () => {
                const data = await getAllBays()
                socket.emit("allBays", data);
                });

        socket.on("updateTrestle", async(data) => {
            const trestleUpdated = await updateTrestle(data)
            socket.emit("trestleUpdated", trestleUpdated)
            
        });


        socket.on("bayUpdate", async (data, callback) => {
          
                const bayUpdated = await updateBay(data.formData);

                if (bayUpdated.status === "400") {
                    return callback({ status: "400", message: "Please fill in all the required fields." });
                } else if (bayUpdated.status === "401") {
                    return callback({ status: "401", message: "Bay not found. Please try again." });
                } else if (!bayUpdated.status) {
                    return callback({ status: "500", message: "Something went wrong. Please try again later!" });
                } else if (bayUpdated.status === "200") {
                    io.emit("bayUpdated", {...bayUpdated, username: data.username});

                }
        });
    });
};

const getIO = () => {
    if (!io) throw new Error("Socket doesn't exist.");
    return io;
};

export { InitialiseSocketio, getIO };
