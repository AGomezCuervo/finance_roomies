import { Model, Column, Table, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import User from "./User";

@Table
class Debt extends Model<Debt> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
    // @ts-ignore
  id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  debtor_id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  creditor_id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  totalAmount!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  currentAmount!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  paid!: boolean;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false,
  })
  created_at!: string;

 @BelongsTo(() => User, 'debtor_id')
  debtor!: User;

  @BelongsTo(() => User, 'creditor_id')
  creditor!: User; 
}

export default Debt;
