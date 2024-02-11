import { Router } from "express";
import debtRouter from "./debtsRouter";
import userRouter from "./userRouter";
import { loginUser } from "../handlers/userHandlers";
import { searchDebts } from "../handlers/debtsHandlers";

const router = Router()

router.use("/debts", debtRouter)
router.use("/user", userRouter)
router.post("/login", loginUser )
router.get("/search", searchDebts)

export default router;
