"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_conection_1 = __importDefault(require("../utils/db_conection"));
class InvoiceDetails extends sequelize_1.Model {
}
InvoiceDetails.init({
    invoice_no: {
        type: sequelize_1.DataTypes.INTEGER
    },
    customer_name: {
        type: sequelize_1.DataTypes.STRING
    },
    salesperson_name: {
        type: sequelize_1.DataTypes.STRING
    },
    notes: {
        type: sequelize_1.DataTypes.TEXT
    },
    payment_type: {
        type: sequelize_1.DataTypes.STRING
    },
    product_id: {
        type: sequelize_1.DataTypes.INTEGER
    },
    item_name: {
        type: sequelize_1.DataTypes.STRING
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER
    },
    total_cost_of_good_sold: {
        type: sequelize_1.DataTypes.INTEGER
    },
    total_price_sold: {
        type: sequelize_1.DataTypes.INTEGER
    },
    profit: {
        type: sequelize_1.DataTypes.INTEGER
    },
    date: {
        type: sequelize_1.DataTypes.STRING
    }
}, { sequelize: db_conection_1.default,
    modelName: "InvoiceDetails",
    tableName: "invoice_details",
});
InvoiceDetails.removeAttribute('id');
exports.default = InvoiceDetails;
