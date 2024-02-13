"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const invoices_details_controller_1 = __importDefault(require("../controllers/invoices_details_controller"));
const invoices_controller_1 = __importDefault(require("../controllers/invoices_controller"));
const products_controller_1 = __importDefault(require("../controllers/products_controller"));
const multer_1 = __importDefault(require("multer"));
const upload_controller_1 = __importDefault(require("../controllers/upload_controller"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)();
router.post('/invoices', invoices_controller_1.default.getInvoices);
router.post('/invoices-all', invoices_controller_1.default.getInvoicesAll);
router.post('/input-invoice', invoices_controller_1.default.inputInvoices);
router.put('/update-invoice', invoices_controller_1.default.updateInvoices);
router.post('/delete-invoice', invoices_controller_1.default.deleteInvoices);
router.post('/test-bulk', invoices_controller_1.default.testBulkInput);
router.post('/products', products_controller_1.default.getProducts);
router.post('/products-all', products_controller_1.default.getProductsAll);
router.post('/input-product', products_controller_1.default.inputProduct);
router.put('/update-product', products_controller_1.default.updateProduct);
router.post('/delete-products', products_controller_1.default.deleteProduct);
router.post('/invoice-details-all', invoices_details_controller_1.default.getInvoicesDetailAll);
router.post('/invoice-details', invoices_details_controller_1.default.getInnvoicesDetail);
router.post('/upload-invoice', upload.single('file'), upload_controller_1.default.uploadInvoice);
exports.default = router;
