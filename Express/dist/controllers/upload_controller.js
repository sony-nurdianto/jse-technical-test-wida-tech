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
const xlsx_1 = __importDefault(require("xlsx"));
const date_fns_1 = require("date-fns");
const products_1 = __importDefault(require("../models/products"));
class UploadFile {
    static uploadInvoice(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const productTransaction = yield ((_a = invoices_1.default.sequelize) === null || _a === void 0 ? void 0 : _a.transaction());
            try {
                const xlxsDateFormated = (date) => {
                    if (date) {
                        const d = new Date((date - 1) * 24 * 60 * 60 * 1000);
                        const formattedDate = (0, date_fns_1.format)(d, "yyyy-MM-dd");
                        return formattedDate;
                    }
                    return date;
                };
                const file = req.file;
                const workbook = xlsx_1.default.read(file === null || file === void 0 ? void 0 : file.buffer, { type: "buffer" });
                const invoiceName = workbook.SheetNames[0];
                const productName = workbook.SheetNames[1];
                const worksheetInvoice = workbook.Sheets[invoiceName];
                const worksheetProduct = workbook.Sheets[productName];
                const jsonDataInvoices = xlsx_1.default.utils.sheet_to_json(worksheetInvoice);
                const jsonDataProducts = xlsx_1.default.utils.sheet_to_json(worksheetProduct);
                let dataErrorInvoice = [];
                let dataSuccessInvoice = [];
                let dataErrorProduct = [];
                let dataSuccessProduct = [];
                yield Promise.all([...jsonDataInvoices.map((invoiceData) => __awaiter(this, void 0, void 0, function* () {
                        try {
                            const invoice = yield invoices_1.default.create(invoiceData, { validate: true });
                            dataSuccessInvoice.push(invoice);
                            return;
                        }
                        catch (error) {
                            let data = {
                                data_input: {},
                                log_error: [],
                            };
                            let log = [];
                            error.errors.forEach((r) => {
                                data = {
                                    data_input: {
                                        invoice_no: r.instance.invoice_no,
                                        customer_name: r.instance.customer_name,
                                        salesperson_name: r.instance.salesperson_name,
                                        payment_type: r.instance.payment_type,
                                        notes: r.instance.notes,
                                    },
                                    log_error: [],
                                };
                                log.push(`error in column ${r.path}, ${r.message}`);
                            });
                            data.log_error = log;
                            dataErrorInvoice.push(data);
                            return;
                        }
                    })), ...jsonDataProducts.map((productData, index, arr) => __awaiter(this, void 0, void 0, function* () {
                        try {
                            const product = yield products_1.default.create(productData, { validate: false });
                            return;
                        }
                        catch (error) {
                            console.log(error);
                            let data = {
                                data_input: {},
                                log_error: [],
                            };
                            let log = [];
                            log.push(error.parent.sqlMessage);
                            data = {
                                data_input: {
                                    invoice_no: error.parameters[0],
                                    item_name: error.parameters[1],
                                    quantity: error.parameters[2],
                                    total_cost_of_good_sold: error.parameters[3],
                                    total_price_sold: error.parameters[4],
                                },
                                log_error: []
                            };
                            data.log_error = log;
                            dataErrorProduct.push(data);
                            return;
                        }
                    }))]);
                res.json({
                    invoice: {
                        data_success: dataSuccessInvoice,
                        data_failed: dataErrorInvoice
                    },
                    product: {
                        data_success: dataSuccessProduct,
                        data_failed: dataErrorProduct
                    }
                });
            }
            catch (error) {
                console.error("Error upload invoices:", error);
                res.status(500).send("Internal Server Error");
            }
        });
    }
}
exports.default = UploadFile;
