import { RequestHandler } from "express";
import { getAllUsers, createUser, userLogin } from "../controllers/userControllers";

export const addUser: RequestHandler = async (req,res) => {
    try {
        await createUser(req.body)   
        res.status(200).json({message: "User created successfully"})
    } catch (error) {
    // @ts-ignore
        res.status(400).json({message: error.message})
    }
}

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({users})
  } catch(error) {
    // @ts-ignore
    res.status(400).json({message: error.message})
  }
}

export const loginUser: RequestHandler = async (req,res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await userLogin(email, password);
      res.status(200).json({user: user, auth: true})
  } catch(error) {
    // @ts-ignore
    res.status(400).json({message: error.message})
  }
}

export const login: RequestHandler =  async (req, res) => {
}
