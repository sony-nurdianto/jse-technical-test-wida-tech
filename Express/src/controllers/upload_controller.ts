import { Request, Response } from "express";
import Invoices from "../models/invoices";
import xlxs from "xlsx";
import { format } from "date-fns";
import Products from "../models/products";

class UploadFile {
  static async uploadInvoice(req: Request, res: Response) {
    const productTransaction = await Invoices.sequelize?.transaction();
    try {
      const xlxsDateFormated = (date: any) => {
        if (date) {
          const d = new Date((date - 1) * 24 * 60 * 60 * 1000);
          const formattedDate = format(d, "yyyy-MM-dd");
          return formattedDate;
        }
        return date;
      };

      const file = req.file;

      const workbook = xlxs.read(file?.buffer, { type: "buffer" });
      const invoiceName = workbook.SheetNames[0];
      const productName = workbook.SheetNames[1];
      const worksheetInvoice = workbook.Sheets[invoiceName];
      const worksheetProduct = workbook.Sheets[productName];
      const jsonDataInvoices = xlxs.utils.sheet_to_json(worksheetInvoice);
      const jsonDataProducts = xlxs.utils.sheet_to_json(worksheetProduct);

      let dataErrorInvoice: any[] = [];
      let dataSuccessInvoice: any[] = [];

      let dataErrorProduct: any[] = [];
      let dataSuccessProduct: any[] = [];

      await Promise.all(
        jsonDataInvoices.map(async (invoiceData: any) => {
          try {
            
            const invoice = await Invoices.create(invoiceData, {validate: true});
            dataSuccessInvoice.push(invoice);
            return ;
          } catch (error: any) {
            let data = {
              data_input: {},
              log_error: <any>[],
            };
            let log: any[] = [];
            error.errors.forEach((r: any) => {
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
        }),
      );

      await Promise.all(
        jsonDataProducts.map(async (productData: any, index: number ,arr: any[]) => {
          try {
            const product = await Products.create(productData, {validate: false});
            dataSuccessProduct.push(product)
            return ;
          } catch (error:any) {
              console.log(error);
            let data = {
                data_input: {},
                log_error: <any>[],
              };
              let log: any[] = [];
              log.push(error.parent.sqlMessage)
              data = {
                  data_input : {
                      invoice_no: error.parameters[0],
                      item_name: error.parameters[1],
                      quantity: error.parameters[2],
                      total_cost_of_good_sold: error.parameters[3],
                      total_price_sold: error.parameters[4],
                  },
                  log_error:[]
              }
              data.log_error = log;
              dataErrorProduct.push(data);
              return;
          }
        })
      )

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
    } catch (error) {
      console.error("Error upload invoices:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

export default UploadFile;
