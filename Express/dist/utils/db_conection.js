"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('sales_database', 'root', 'Kohend@789', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false,
    }
});
exports.default = sequelize;
