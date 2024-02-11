import Router from "express";
import { addUser, getUsers } from "../handlers/userHandlers";

const userRouter = Router()

userRouter.post("/create", addUser)
userRouter.get("/", getUsers)

export default userRouter;
