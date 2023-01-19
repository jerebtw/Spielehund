import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import PocketBase from "npm:pocketbase";
import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const pb = new PocketBase("https://schule-projekt-pocketbase.jerebtw.de");
await pb.admins.authWithPassword(
  Deno.env.get("ADMIN_EMAIL") || "",
  Deno.env.get("ADMIN_PASSWORD") || "",
);
const records = await pb.collection("test").getList(3, 10);
console.log(records);

//TODO Auth middleware
// io.on("connection", (socket) => {
//   socket.on(
//     "games",
//     async (callback?: (result: boolean, data?: GameData[]) => void) => {
//       try {
//         const gamesData = await connection.query<GameData[]>(`
//           SELECT *
//           FROM Games
//         `);

//         callback?.(true, gamesData[0]);
//         return;
//       } catch (e) {
//         console.error("Error while getting games", e);
//       }

//       callback?.(false);
//     },
//   );

//   socket.on(
//     "game",
//     async (
//       id: string,
//       callback?: (result: boolean, data?: GameData) => void,
//     ) => {
//       if (!id) {
//         callback?.(false);
//         return;
//       }

//       try {
//         const gameData = await connection.query<GameData[]>(`
//           SELECT *
//           FROM Games
//           WHERE id = ${mysql.escape(id)}
//         `);

//         callback?.(true, gameData[0][0]);
//         return;
//       } catch (e) {
//         console.error("Error while getting a game", e);
//       }

//       callback?.(false);
//     },
//   );
// });

//TODO Auth api swagger???? :)
// app.get("/user", (req, res) => {});

// app.get("/login", (req, res) => {});

// app.post("/signup", (req, res) => {});

// app.post("/logout", (req, res) => {});

// server.listen(PORT, () => {
//   console.info(`listening on *:${PORT}`);
// });

const app = new Application();
const router = new Router();
router.get("/", (context) => {
  context.response.body = "Hello world!";
});

app.use(router.routes());
app.use(router.allowedMethods());

console.info(`Listening on ${PORT}`);
await app.listen({ port: PORT });
