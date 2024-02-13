"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_conection_1 = __importDefault(require("../utils/db_conection"));
class Invoices extends sequelize_1.Model {
}
Invoices.init({
    invoice_no: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        validate: {
            min: 1,
            notNull: true,
        },
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: db_conection_1.default.literal("CURRENT_TIMESTAMP"),
    },
    customer_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, Infinity],
        },
    },
    salesperson_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, Infinity],
        },
    },
    payment_type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    notes: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [5, Infinity],
        },
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: db_conection_1.default.literal("CURRENT_TIMESTAMP"),
    },
}, {
    sequelize: db_conection_1.default,
    modelName: "Invoices",
    tableName: "invoices",
});
exports.default = Invoices;
