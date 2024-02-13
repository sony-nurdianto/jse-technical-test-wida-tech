import express from "express";
import InvoicesDetailsController from "../controllers/invoices_details_controller";
import InvoicesController from "../controllers/invoices_controller";
import ProductController from "../controllers/products_controller";
import multer from "multer";
import UploadFile from "../controllers/upload_controller";

const router = express.Router();
const upload = multer();

router.post('/invoices', InvoicesController.getInvoices);
router.post('/invoices-all', InvoicesController.getInvoicesAll);
router.post('/input-invoice', InvoicesController.inputInvoices);
router.put('/update-invoice', InvoicesController.updateInvoices);
router.post('/delete-invoice', InvoicesController.deleteInvoices);
router.post('/test-bulk', InvoicesController.testBulkInput);

router.post('/products', ProductController.getProducts);
router.post('/products-all', ProductController.getProductsAll);
router.post('/input-product', ProductController.inputProduct);
router.put('/update-product', ProductController.updateProduct);
router.post('/delete-products', ProductController.deleteProduct);

router.post('/invoice-details-all', InvoicesDetailsController.getInvoicesDetailAll);
router.post('/invoice-details', InvoicesDetailsController.getInnvoicesDetail);

router.post('/upload-invoice',upload.single('file'), UploadFile.uploadInvoice);

export default router;