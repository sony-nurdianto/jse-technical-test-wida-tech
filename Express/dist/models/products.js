"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_conection_1 = __importDefault(require("../utils/db_conection"));
class Products extends sequelize_1.Model {
}
Products.init({
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    invoice_no: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    item_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, Infinity],
        },
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        },
    },
    total_cost_of_good_sold: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        },
    },
    total_price_sold: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        },
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: db_conection_1.default.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: db_conection_1.default.literal("CURRENT_TIMESTAMP"),
    },
}, {
    sequelize: db_conection_1.default,
    modelName: "Products",
    tableName: "products",
});
exports.default = Products;
