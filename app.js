import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import {errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

config({
    path: "./data/config.env"
})

export const app = express();


app.use(express.json())
app.use(cookieParser())
app.use("/users", userRouter)
app.use("/tasks", taskRouter)


app.use(cors({
    origin:[process.env.FRONTEND_URI],
    method:["GET","POST","PUT","DELETE"],
    Credentials:true,
}))


app.get("/", (req, res) => {
    res.send("server is working");
})

app.use(errorMiddleware)