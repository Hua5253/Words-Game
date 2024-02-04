import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // origin: ["http://localhost:5173"], 
    // methods: ["GET", "POST"],
    origin: '*',
  },
});

app.use(cors()); // Enable CORS for all routes 

const connections = new Set();
let room = 1;

io.on("connection", (socket) => {
    console.log(socket.id);
    connections.add(socket.id);

    // opponent found
    console.log(connections.size + " connections");
    if(connections.size % 2 === 0) {
        console.log("opponent found");
        socket.to(room.toString()).emit("opponent-found");
    }

    socket.on("finding-a-match", (cb) => {
      // join to an assigned room
      socket.join(room.toString());
      cb(room);
    })

    socket.on("disconnect", () => {
      // connections.delete(socket.id);
    })
});

const gameIo = io.of("/game");

gameIo.on('connection', (socket) => {
    socket.on("message", (data) => {
      socket.broadcast.emit("chat message", data);
    })
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
