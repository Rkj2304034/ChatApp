import express from "express"
const app = express();
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import userRouter from "./routes/user.js"
import cookieParser from "cookie-parser";
import messageRouter from "./routes/message.js";
import cors from "cors";
import http from "http"
import { initSocket } from "./socket.js";
import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
const _dirname = path.resolve();


const server = http.createServer(app);
initSocket(server);

dotenv.config({});

const PORT =  process.env.PORT || 5000;

const corsOptions = {
    origin : 'http://localhost:5173',
    credentials : true
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());


app.use("/api/user",userRouter);
app.use("/api/message",messageRouter)




server.listen(PORT,async()=>{
    await connectDb();
    console.log(`server stated running on port ${PORT}`)
})