import { Sequelize } from "sequelize-typescript";
import User from "./models/User";
import Debt from "./models/Debt";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  define: {
    timestamps: false,
  },
  models: [User, Debt],
  native: false,
  logging: false,
})


export default sequelize;
