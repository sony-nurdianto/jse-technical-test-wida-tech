import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/db_conection";

class InvoiceDetails extends Model {
  public invoice_no!: number;
  public customer_name!: string;
  public salesperson_name!: string;
  public notes!: string;
  public payment_type!: string;
  public product_id!: number;
  public item_name!: string;
  public quantity!: number;
  public total_cost_of_good_sold!: number;
  public total_price_sold!: number;
  public profit!: number;
  public date!: string;
}

InvoiceDetails.init(
  {
    invoice_no: {
        type: DataTypes.INTEGER
    },
    customer_name: {
        type: DataTypes.STRING
    },
    salesperson_name: {
        type: DataTypes.STRING
    },
    notes: {
        type: DataTypes.TEXT
    },
    payment_type: {
        type: DataTypes.STRING
    },
    product_id: {
        type: DataTypes.INTEGER
    },
    item_name: {
        type: DataTypes.STRING
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    total_cost_of_good_sold: {
        type: DataTypes.INTEGER
    },
    total_price_sold: {
        type: DataTypes.INTEGER
    },
    profit: {
        type: DataTypes.INTEGER
    },
    date: {
        type: DataTypes.STRING
    }
  },
  { sequelize, 
    modelName: "InvoiceDetails", 
    tableName: "invoice_details",
}
);

InvoiceDetails.removeAttribute('id');

export default InvoiceDetails;