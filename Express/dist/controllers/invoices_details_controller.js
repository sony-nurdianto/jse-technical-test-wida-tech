"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const invoices_details_1 = __importDefault(require("../models/invoices_details"));
class InvoicesDetailsController {
    static getInvoicesDetailAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const invoicesDetails = yield invoices_details_1.default.findAll();
                res.status(200).json(invoicesDetails);
            }
            catch (error) {
                console.error('Error get invoices Details:', error);
                res.status(500).send('Internal Server Error');
            }
        });
    }
    static getInnvoicesDetail(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.data;
                const invoiceDetails = yield invoices_details_1.default.findAll({
                    where: data.start_date && data.end_date ? {
                        date: {
                            [sequelize_1.Op.between]: [data === null || data === void 0 ? void 0 : data.start_date, data === null || data === void 0 ? void 0 : data.end_date]
                        },
                    } : {},
                    limit: (data === null || data === void 0 ? void 0 : data.limit) || 5,
                    offset: (data === null || data === void 0 ? void 0 : data.page) || 0,
                });
                res.status(200).json(invoiceDetails);
            }
            catch (error) {
                console.error('Error get invoices Detail:', error);
                res.status(500).send('Internal Server Error');
            }
        });
    }
}
exports.default = InvoicesDetailsController;
