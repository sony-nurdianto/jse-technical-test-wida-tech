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
const products_1 = __importDefault(require("../models/products"));
const sequelize_1 = require("sequelize");
class ProductController {
    static getProductsAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield products_1.default.findAll();
                res.status(200).json(products);
            }
            catch (error) {
                console.error('Error get products:', error);
                res.status(500).send('Internal Server Error');
            }
        });
    }
    static getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataProduct = req.body.data;
                const newProduct = Object.assign({}, dataProduct);
                const products = yield products_1.default.findAll({
                    where: newProduct.start_date && newProduct.end_date ? {
                        created_at: {
                            [sequelize_1.Op.between]: [newProduct === null || newProduct === void 0 ? void 0 : newProduct.start_date, newProduct === null || newProduct === void 0 ? void 0 : newProduct.end_date]
                        },
                    } : {},
                    limit: (newProduct === null || newProduct === void 0 ? void 0 : newProduct.limit) || 5,
                    offset: (newProduct === null || newProduct === void 0 ? void 0 : newProduct.page) || 0,
                });
                res.status(200).json(products);
            }
            catch (error) {
                console.error('Error get products:', error);
                res.status(500).send('Internal Server Error');
            }
        });
    }
    static inputProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataProduct = req.body.data;
                const newProduct = Object.assign({}, dataProduct);
                const product = yield products_1.default.create(newProduct);
                res.status(200).json(product);
            }
            catch (error) {
                console.error('Error input products:', error);
                res.status(500).send('Internal Server Error');
            }
        });
    }
    static updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataProduct = req.body.data;
                const newProduct = Object.assign({}, dataProduct);
                for (let k in newProduct) {
                    const key = k;
                    if (newProduct[key] === undefined || newProduct[key] === null) {
                        delete (newProduct[key]);
                    }
                }
                const product = yield products_1.default.update(newProduct, {
                    where: {
                        product_id: newProduct.product_id
                    }
                });
                res.status(200).json({
                    message: 'success update row',
                    update_count: product
                });
            }
            catch (error) {
                console.error('Error input products:', error);
                res.status(500).send('Internal Server Error');
            }
        });
    }
    static deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataProduct = req.body.data;
                const newProduct = Object.assign({}, dataProduct);
                const product = yield products_1.default.destroy({ where: {
                        product_id: newProduct.product_id
                    } });
                res.status(200).json({
                    message: 'success delete row',
                    delete_count: product
                });
            }
            catch (error) {
                console.error('Error input products:', error === null || error === void 0 ? void 0 : error.name);
                res.status(500).send(error === null || error === void 0 ? void 0 : error.name);
            }
        });
    }
}
exports.default = ProductController;
