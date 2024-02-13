import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/db_conection";

class Invoices extends Model {
  public invoice_no!: number;
  public date!: string;
  public customer_name!: string;
  public salesperson_name!: string;
  public payment_type!: "CASH" | "CREDIT";
  public notes!: string;
  public updated_at!: string;
}

Invoices.init(
  {
    invoice_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      validate: {
        min: 1,
        notNull: true,
      },
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    customer_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, Infinity],
      },
    },
    salesperson_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, Infinity],
      },
    },
    payment_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [5, Infinity],
      },
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize,
    modelName: "Invoices",
    tableName: "invoices",
  }
);

export default Invoices;
