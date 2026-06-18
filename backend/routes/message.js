import express from "express";
import { getMessage, sendMessage } from "../controllers/message.js";
import { authenticateUser } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";

const messageRouter = express.Router();

messageRouter.post("/send/:id", authenticateUser, upload.single("file"), sendMessage);
messageRouter.get("/receive/:id", authenticateUser, getMessage);

export default messageRouter;
