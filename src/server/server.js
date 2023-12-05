import express from "express";
import cors from "cors"

const app = express();

// const client = new Client({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   port: Number(process.env.DB_PORT),
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });

async function startServer() {
  // await client.connect();

  app
    .use(cors())
    .use(express.json())
    .get("/api/burgers", (req, res) => {
      res.json({ burger: "delicious" });
    })
    .listen(3001, () => {
      console.log("Server has started at http://localhost:3001");
    });
}

startServer();