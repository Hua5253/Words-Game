import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors()); // Enable CORS for all routes 

interface Player extends Socket {}

let waitingPlayers: Player[] = [];

io.on('connection', (socket: Socket) => {
    console.log('A user connected:', socket.id);

    socket.on('finding-a-match', () => {
        console.log('Player looking for match:', socket.id);
        waitingPlayers.push(socket as Player);

        if (waitingPlayers.length >= 2) {
            const player1 = waitingPlayers.shift()!;
            const player2 = waitingPlayers.shift()!;

            const roomId = player1.id + '#' + player2.id;
            player1.join(roomId);
            player2.join(roomId);

            io.to(roomId).emit('matchFound', { roomId });
        }
    });

    socket.on('disconnect', () => {
        waitingPlayers = waitingPlayers.filter(player => player.id !== socket.id);
        console.log('User disconnected', socket.id);
    });
});

const gameIo = io.of("/game");

gameIo.on('connection', (socket) => {
    socket.on("message", (data) => {
      socket.broadcast.emit("chat message", data);
    })
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
