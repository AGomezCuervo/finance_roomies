import { Op } from "sequelize";
import Debt from "../models/Debt";
import User from "../models/User";
import { DebtBody } from "../utils/types";
import { searchDebts } from "../handlers/debtsHandlers";

export const getAllDebts = async() => {
  try {
    const originalDebts = await Debt.findAll({
      attributes: { exclude: ['debtor_id', 'creditor_id'] },
      include: [
        {
          model: User,
          as: 'debtor',
          attributes: ['id', 'name'], 
        },
        {
          model: User,
          as: 'creditor',
          attributes: ['id', 'name'], 
        },
      ],
    });
    const reverseOriginalDebts = originalDebts.reverse();
    const paidDebts = reverseOriginalDebts.filter((element) => element.paid === true);
    const pendingDebts = reverseOriginalDebts.filter((element) => element.paid === false);
    return pendingDebts.concat(paidDebts);
  } catch (error) {
    throw error
  }
}

export const totalDebts = async(actualUser: number) => {

  let totalDebt = await Debt.sum("currentAmount", {
    where: {
      debtor_id: actualUser,
    }
  });

  let totalCreditorDebt = await Debt.sum("currentAmount", {
    where: {
      creditor_id: actualUser,
    }
  });

  if(!totalDebt) totalDebt = 0;
  if(!totalCreditorDebt) totalCreditorDebt = 0;
  const totalAmount = totalCreditorDebt - totalDebt;

  return {
    totalAmount,
    totalCreditorDebt,
    totalDebt
  }
}

export const createDebt = async(body: DebtBody) => {
  const data = body;
  if(data.totalAmount <= 0 || data.currentAmount <= 0) data.paid = true;
  // @ts-ignore
  const newDebt =  await Debt.create({...data});
  if(newDebt) {
    return newDebt;
  }
  throw new Error("Cannot create debt")
}

export const getById = async (id: number) => {
  try {
    const debt = await Debt.findByPk(id);
    if(!debt) throw new Error("Cannot find debt")
    return debt;
  } catch (error) {
    throw error;
  }
}

export const updateDebt = async (id: number, body: DebtBody) => {
  try {
    const debt = await Debt.findByPk(id);
    if (!debt) {
      throw new Error("The debt doesn't exist");
    }

    const data = body;
    if (data.currentAmount === 0 || data.totalAmount === 0) {
      data.paid = true;
      return await debt?.update(data);
    } else {
      data.paid = false;
      return await debt?.update(data);
    }
  } catch (error) {
    throw error;
  }
};

export const deleteDebt = async (id: number) => {
  try {
    const deleted = await Debt.destroy({
      where: {
        id: id
      }
    })
    if(deleted === 0) throw new Error("Debt doesn't exist")
  } catch (error) {
    throw error
  }
}

export const getSearchedDebts = async (description: string) => {
  try {
    const searchedDebts = await Debt.findAll({
      where: {
        description:{
          [Op.like]: `%${description}%`
        }
      },
      attributes: { exclude: ['debtor_id', 'creditor_id'] },
      include: [
        {
          model: User,
          as: 'debtor',
          attributes: ['id', 'name'], 
        },
        {
          model: User,
          as: 'creditor',
          attributes: ['id', 'name'], 
        },
      ],
    })
    return searchedDebts;
  } catch (error) {
    throw error;
  }
}
