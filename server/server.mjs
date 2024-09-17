import express from "express";
import cors from "cors";
import morgan from "morgan";
import chalk from "chalk"; // Import chalk
import { Server } from "socket.io"; // Import dotenv
import { createServer } from "http"; // Import dotenv
import dotenv from "dotenv"; // Import dotenv

// Load environment variables from .env file
dotenv.config();

// database file conect
import connectDB from "./config/db.mjs";

// Connect to the database
connectDB();

const app = express();

// CORS options
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true,
};

// Use CORS middleware with specified options
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "come to hassan" });
});

// createServer call kiya joka humna http sai lya hai or is mai humna apni express app defind ki hain
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Made socket connection in server", socket.id);
  socket.on("add-todo", (data) => {
    console.log("data: ", data);
    io.emit("send-todo", data);
  });
});

socket.on("disconnected", () => {
  console.log("User disconnected", socket.id);
});

// Set port and listen for requests
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(chalk.bgBlue.white(`Server is running on port ${PORT}.`));
});
