import { Model, Column, Table, DataType } from "sequelize-typescript";

@Table
class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  })
    // @ts-ignore
  id!: number;

  @Column({
    type: DataType.CHAR,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.CHAR,
    allowNull: false,
    unique: true
  })
  email!: string;

  @Column({
    type: DataType.CHAR,
    allowNull: false
  })
  password!: string
}

export default User;
