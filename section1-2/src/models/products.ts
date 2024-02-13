import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/db_conection";

class Products extends Model {
  public product_id!: number;
  public invoice_no!: number;
  public item_name!: string;
  public quantity!: number;
  public total_cost_of_good_sold!: number;
  public total_price_sold!: number;
  public created_at!: string;
  public updated_at!: string;
}

Products.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    invoice_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    item_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, Infinity],
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    total_cost_of_good_sold: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    total_price_sold: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize,
    modelName: "Products",
    tableName: "products",
  }
);

export default Products;
