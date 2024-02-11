import { RequestHandler } from "express";
import { getSearchedDebts, createDebt, deleteDebt, getAllDebts, totalDebts, updateDebt, getById } from "../controllers/debtsControllers";
import Debt from "../models/Debt";

export const getDebts: RequestHandler = async (req, res) => {
  try {
    const debts = await getAllDebts();
    res.status(200).json(debts)
  } catch(error) {
    res.status(400).json({message: error})
  }
}

export const getDebtById: RequestHandler = async (req, res) => {
  const id = Number(req.params.debtId);
  try {
    const debt = await getById(id);
    res.status(200).json(debt);
  } catch(error) {
    // @ts-ignore
    res.status(400).json({message: error.message})
  }
}

export const getTotalDebts: RequestHandler = async (req, res) => {
  const actualUser = Number(req.query.actualUser);
  if(actualUser) {
    try {
      const total = await totalDebts(actualUser);
      res.status(200).json(total);
    } catch(error) {
    // @ts-ignore
      res.status(400).json({message: error.message});
    }
  } else {
    res.status(400).json({message: "Users not valid"})
  }
}

export const addDebt: RequestHandler = async (req, res) => {
  console.log(req.body)
  try {
    await createDebt(req.body);
    res.status(200).json({message: "Debt created successfully"})
  } catch(error) {
    // @ts-ignore
    res.status(400).json({message: error.message})
  }
}

export const editDebt: RequestHandler = async (req, res) => {
  const id = Number(req.params.debtId);
  const body = req.body;
  if (id && body) {
    try {
      const newDebt = await updateDebt(id, body);
      res.status(200).json({ message: "Debt updated successfully" });
    } catch (error) {
    // @ts-ignore
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(400).json({ message: "Invalid parameters" });
  }
}

export const removeDebt: RequestHandler = async (req, res) => {
  const id = Number(req.params.debtId);
  if (id) {
    try {
      await deleteDebt(id);
      res.status(200).json({message: "Debt removed successfully"})
    } catch (error) {
    // @ts-ignore
      res.status(400).json({message: error.message});
    } 
  } else {
    res.status(400).json({message: "Id doesn't exist"});
  }
}

export const searchDebts: RequestHandler = async (req, res) => {
  let search = req.query.search;
  if(!search) search = "";
  try {
    // @ts-ignore
    const newData = await getSearchedDebts(search);
    res.status(200).json(newData)
  } catch (error) {
    // @ts-ignore
    res.status(400).json({message: error.message})
  }
}

export const payAll: RequestHandler = async (req, res) => {
  const id = Number(req.params.userId);
  try {
    await Debt.update({ currentAmount: 0, paid: true }, { where: {debtor_id: id} });
    res.status(200).json({message: "All the pays where successfully"})
  } catch(error) {
    // @ts-ignore
    res.status(400).json({message: error.message})
  }
}
