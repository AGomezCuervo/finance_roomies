import Router from "express";
import { addDebt, getDebts, payAll, getTotalDebts, editDebt, removeDebt, getDebtById } from "../handlers/debtsHandlers";

const debtRouter = Router()

debtRouter.get("/", getDebts)
debtRouter.post("/create", addDebt)
debtRouter.get("/pay-all/:userId", payAll)
debtRouter.get("/total-amount", getTotalDebts)
debtRouter.get("/:debtId", getDebtById)
debtRouter.put("/:debtId", editDebt)
debtRouter.delete("/:debtId", removeDebt)
export default debtRouter;
