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

io.on('connection', (socket) => {
    // console.log(socket.id);
    socket.on("message", (data) => {
      socket.broadcast.emit("chat message", data);
    })
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
