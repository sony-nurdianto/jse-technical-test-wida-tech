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
const invoices_1 = __importDefault(require("../models/invoices"));
// import { InvoiceInterface } from '../constants/invoice-constants';
const sequelize_1 = require("sequelize");
// import { FillterInterface } from '../constants/fillter-constants';
class InvoicesController {
    static getInvoicesAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const invoices = yield invoices_1.default.findAll();
                res.status(200).json(invoices);
            }
            catch (error) {
                console.error('Error get invoices:', error);
                res.status(500).send('Internal Server Error');
            }
        });
    }
    static getInvoices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataInvoice = req.body.data;
                const newInvoice = Object.assign({}, dataInvoice);
                const invoices = yield invoices_1.default.findAll({
                    where: newInvoice.start_date && newInvoice.end_date ? {
                        date: {
                            [sequelize_1.Op.between]: [newInvoice === null || newInvoice === void 0 ? void 0 : newInvoice.start_date, newInvoice === null || newInvoice === void 0 ? void 0 : newInvoice.end_date]
                        },
                    } : {},
                    limit: (newInvoice === null || newInvoice === void 0 ? void 0 : newInvoice.limit) || 5,
                    offset: (newInvoice === null || newInvoice === void 0 ? void 0 : newInvoice.page) || 0,
                });
                res.status(200).json(invoices);
            }
            catch (error) {
                console.error('Error get invoices:', error);
                res.status(500).send('Internal Server Error');
            }
        });
    }
    static inputInvoices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataInvoice = req.body.data;
                const newInvoice = Object.assign({}, dataInvoice);
                const invoice = yield invoices_1.default.create(newInvoice);
                res.status(200).json(invoice);
            }
            catch (error) {
                console.error('Error input invoices:', error);
                res.status(500).send('Internal Server Error');
            }
        });
    }
    static testBulkInput(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield ((_a = invoices_1.default.sequelize) === null || _a === void 0 ? void 0 : _a.transaction());
            try {
                let dataError = [];
                const createInvoice = yield Promise.all(req.body.data.map(((invoiceData) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const invoice = yield invoices_1.default.create(invoiceData, { transaction });
                        return invoice;
                    }
                    catch (error) {
                        let data = {
                            data_input: {},
                            log_error: []
                        };
                        let log = [];
                        error.errors.forEach((r) => {
                            data = {
                                data_input: {
                                    invoice_no: r.instance.invoice_no,
                                    customer_name: r.instance.customer_name,
                                    salesperson_name: r.instance.salesperson_name,
                                    payment_type: r.instance.payment_type,
                                    notes: r.instance.notes
                                },
                                log_error: []
                            };
                            log.push(`error in column ${r.path}, ${r.message}`);
                        });
                        data.log_error = log;
                        dataError.push(data);
                        return { error, data: invoiceData };
                    }
                }))));
                // let failedInvoice: any;
                const successInvoice = createInvoice.filter((result) => !result.error);
                const failedInvoiceLog = createInvoice.filter((result) => result.error);
                // failedInvoiceLog.forEach((value) => {
                //     // console.log(value.error.errors[0].message);
                //     failedInvoiceLog.
                // })
                res.json({
                    successInvoice: successInvoice,
                    failedInvoice: dataError
                });
                yield transaction.commit();
                console.log('Data berhasil ditambahkan ke database:');
            }
            catch (error) {
                yield transaction.rollback();
                // const failedUsers = req.body.data.filter((invoice:any, index: number) => error.errors[index]);
                console.error('Data gagal ditambahkan ke database:');
                // res.status(200).send(failedUsers);
            }
        });
    }
    static updateInvoices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataInvoice = req.body.data;
                const newInvoice = Object.assign({}, dataInvoice);
                for (let k in newInvoice) {
                    const key = k;
                    if (newInvoice[key] === undefined || newInvoice[key] === null) {
                        delete (newInvoice[key]);
                    }
                }
                const invoice = yield invoices_1.default.update(newInvoice, {
                    where: {
                        invoice_no: newInvoice.invoice_no
                    }
                });
                res.status(200).json({
                    message: 'success update row',
                    count_update: invoice
                });
            }
            catch (error) {
                console.error('Error input invoices:', error);
                res.status(500).send('Internal Server Error');
            }
        });
    }
    static deleteInvoices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataInvoice = req.body.data;
                const newInvoice = Object.assign({}, dataInvoice);
                const invoice = yield invoices_1.default.destroy({ where: {
                        invoice_no: newInvoice.invoice_no
                    } });
                res.status(200).json({
                    message: 'success delete row',
                    delete_count: invoice
                });
            }
            catch (error) {
                console.error('Error input invoices:', error);
                res.status(500).send(error === null || error === void 0 ? void 0 : error.name);
            }
        });
    }
}
exports.default = InvoicesController;
