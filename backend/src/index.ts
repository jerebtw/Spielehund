import chalk from "chalk";
import dotenv from "dotenv";
import env from "env-var";
import express from "express";
import http from "node:http";
import mysql from "mysql2";
import { Logger } from "tslog";
import { connectDB } from "./db.js";
import { Server } from "socket.io";
import { RowDataPacket } from "mysql2";

//#region Init stuff
new Logger({ overwriteConsole: true });

async function onClose() {
  try {
    await connection?.end();
    console.info(`Disconnected from ${chalk.bold("DB")}`);
  } catch {}
  process.exit(0);
}

process.on("SIGINT", onClose);
process.on("SIGHUP", onClose);
process.on("SIGTERM", onClose);
process.on("beforeExit", onClose);

process.on("uncaughtException", async (err, origin) => {
  console.error(err, origin);
  await onClose();
});

dotenv.config();

const PORT = env.get("PORT").default(3000).asPortNumber();
const connection = await connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    credentials: true,
  },
});
//#endregion

interface GameData extends RowDataPacket {
  id: number;
  name: string;
  imageSrc: string;
}

//TODO Auth middleware
io.on("connection", (socket) => {
  socket.on(
    "games",
    async (callback?: (result: boolean, data?: GameData[]) => void) => {
      try {
        const gamesData = await connection.query<GameData[]>(`
          SELECT *
          FROM Games
        `);

        callback?.(true, gamesData[0]);
        return;
      } catch (e) {
        console.error("Error while getting games", e);
      }

      callback?.(false);
    },
  );

  socket.on(
    "game",
    async (
      id: string,
      callback?: (result: boolean, data?: GameData) => void,
    ) => {
      if (!id) {
        callback?.(false);
        return;
      }

      try {
        const gameData = await connection.query<GameData[]>(`
          SELECT *
          FROM Games
          WHERE id = ${mysql.escape(id)}
        `);

        callback?.(true, gameData[0][0]);
        return;
      } catch (e) {
        console.error("Error while getting a game", e);
      }

      callback?.(false);
    },
  );
});

//TODO Auth api swagger???? :)
app.get("/user", (req, res) => {});

app.get("/login", (req, res) => {});

app.post("/signup", (req, res) => {});

app.post("/logout", (req, res) => {});

server.listen(PORT, () => {
  console.info(`listening on *:${PORT}`);
});
