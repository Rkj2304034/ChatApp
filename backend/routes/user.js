import express from "express";
import { getOtherUsers, getProfile, loginUser, logoutUser, registerUser } from "../controllers/user.js";
import { authenticateUser } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);
userRouter.get("/", authenticateUser, getOtherUsers);
userRouter.get("/me",authenticateUser, getProfile)

export default userRouter;
