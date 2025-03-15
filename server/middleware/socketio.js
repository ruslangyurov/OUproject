import { Server } from 'socket.io';
import { updateBay } from '../controller/yardController';

let io;

const InitialiseSocketio = ({ server }) => {
    io = new Server(server, { cors: { origin: "*", credentials: true } });

    io.on("connection", (socket) => {
        console.log("New user connected:", socket.id);

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });

        socket.on("bayUpdate", async (formData, callback) => {
            try {
                const bayUpdated = await updateBay(formData);

                if (bayUpdated.status === "400") {
                    return callback({ status: "400", message: "Please fill in all the required fields." });
                }
                if (bayUpdated.status === "401") {
                    return callback({ status: "401", message: "Bay not found. Please try again later." });
                }

                // Emit update to all connected clients except the sender
                socket.broadcast.emit("bayUpdated", bayUpdated);
                callback({ status: "200", message: "Bay successfully updated", bay: bayUpdated.bayInfo });
            } catch (error) {
                return callback({ status: "500", message: "Something went wrong. Please try again later" });
            }
        });
    });
};

const getIO = () => {
    if (!io) throw new Error("Socket doesn't exist.");
    return io;
};

export { InitialiseSocketio, getIO };
