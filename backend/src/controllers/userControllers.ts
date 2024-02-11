import User from "../models/User";
import { UserBody } from "../utils/types";

export const getAllUsers = async() => {
  const users = await User.findAll({
    attributes: {exclude: ["password"]}
  });
  return users;
}

export const createUser = async (body: UserBody) => {
  try {
    // @ts-ignore
    const newUser =  await User.create({...body});
    return newUser;
  } catch (error) {
    throw new Error("Cannot create user");
  }
}

export const userLogin = async (email: string, password: string) => {
  try {
    const user = await User.findOne({
      where: {
        email,
        password
      },
      attributes: {exclude: ["password"]}
    })
    if(!user) throw new Error("wrong credentials")
    return user;
  } catch(error) {
    throw error
  }
} 
