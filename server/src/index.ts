import express, { NextFunction, Request, Response } from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/user-router";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.use(cors()); // Enable CORS for all routes

interface Player extends Socket {}

let waitingPlayers: Player[] = [];

io.on("connection", (socket: Socket) => {
    // console.log('A user connected:', socket.id);

    socket.on("finding-a-match", () => {
        // console.log('Player looking for match:', socket.id);
        waitingPlayers.push(socket as Player);

        if (waitingPlayers.length >= 2) {
            const player1 = waitingPlayers.shift()!;
            const player2 = waitingPlayers.shift()!;

            const roomId = player1.id + "#" + player2.id;
            player1.join(roomId);
            player2.join(roomId);

            // const responst = io.to(player1.id).emit("myturn",true);
            // console.log("setting player1 to true " + responst)
            // io.to(player2.id).emit("myturn",false);


            io.to(roomId).emit("matchFound", { roomId });
            player1.on("message", (data) => {
                player1.to(roomId).emit("chat message", data);
            });
            player2.on("message", (data) => {
                player2.to(roomId).emit("chat message", data);
            });

            player1.on("player", (player) => {
                player1.to(roomId).emit("player", player);
            });
            player2.on("player", (player) => {
                player2.to(roomId).emit("player", player);
            });

            player1.on("myGuessResult", (myGuessResult) => {
                player1.to(roomId).emit("opponentGuessResult", myGuessResult);
                player1.to(roomId).emit("myturn", true);

            });

            player2.on("myGuessResult", (myGuessResult) => {
                player2.to(roomId).emit("opponentGuessResult", myGuessResult);
                player2.to(roomId).emit("myturn", true);

            });

            player1.on("guessWordReady", (wordToGuess) => {
                player1.to(roomId).emit("guessWord", wordToGuess);
                player1.to(roomId).emit("myturn", false);
            });
            player2.on("guessWordReady", (wordToGuess) => {
                player2.to(roomId).emit("guessWord", wordToGuess);
                player2.to(roomId).emit("myturn", true);

            });

            player1.on("end", () => {
                player1.to(roomId).emit("end");

                //turning off message, player, myguessresult, guesswordready for both users?
                player1.removeAllListeners("message");
                player2.removeAllListeners("message");
            });
            player2.on("end", () => {
                player2.to(roomId).emit("end");
                player1.removeAllListeners("message");
                player2.removeAllListeners("message");

                //turning off message, player, myguessresult, guesswordready for both users?
            });
        }
    });

    //when game finish, front-end emit this event
    socket.on("update-stats", () => {
        io.emit("stats");
    });

    socket.on("disconnect", () => {
        waitingPlayers = waitingPlayers.filter(
            (player) => player.id !== socket.id
        );
        // console.log('User disconnected', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export const DATAPORT = 8000;
const MongoDBURL = "mongodb://localhost:27017/word-game";

mongoose
    .connect(MongoDBURL)
    .then(() => {
        app.listen(DATAPORT, () =>
            console.log(`app is listening on port ${DATAPORT}`)
        );
    })
    .catch((err) => {
        console.error(err);
    });

app.use(express.json());
app.use(cookieParser());

app.use(
    session({
        secret: "aw1sdwl$ak",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
        },
        rolling: true,
        store: MongoStore.create({
            mongoUrl: MongoDBURL,
        }),
    })
);

app.use("/api", userRouter);

app.use(
    (
        error: unknown,
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        console.error(error);
        let errorMessage = "An unknown error occured.";
        if (error instanceof Error) errorMessage = error.message;
        response.status(500).json({ error: errorMessage });
    }
);
