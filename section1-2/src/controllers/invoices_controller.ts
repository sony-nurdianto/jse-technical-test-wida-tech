import {Request , Response} from 'express';
import Invoices from '../models/invoices';
// import { InvoiceInterface } from '../constants/invoice-constants';
import { Op } from 'sequelize';
import { FillterInterface } from '../constants/fillter-constant';
import { InvoiceInterface } from '../constants/invoices-constant';
// import { FillterInterface } from '../constants/fillter-constants';

class InvoicesController {
    static async getInvoicesAll(req: Request, res: Response) {
        try {
            const invoices = await Invoices.findAll();
            res.status(200).json(invoices);
        } catch (error) {
            console.error('Error get invoices:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async getInvoices(req: Request, res: Response) {
        try {
            const dataInvoice: FillterInterface = req.body.data;
            const newInvoice = {...dataInvoice};

            const invoices = await Invoices.findAll(
                {
                    where: newInvoice.start_date && newInvoice.end_date ? {
                        date: {
                            [Op.between]: [newInvoice?.start_date, newInvoice?.end_date]
                        },
                    } : {},
                    limit: newInvoice?.limit || 5,
                    offset: newInvoice?.page || 0,
                }
            );
            res.status(200).json(invoices);
        } catch (error) {
            console.error('Error get invoices:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async inputInvoices(req:Request, res: Response) {
        try{

            const dataInvoice: InvoiceInterface = req.body.data;
            const newInvoice = {...dataInvoice};

            const invoice = await Invoices.create(newInvoice);
            res.status(200).json(invoice)
        } catch (error) {
            console.error('Error input invoices:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async testBulkInput(req:Request, res: Response) {
        const transaction = await Invoices.sequelize?.transaction();

        try {

            let dataError: any[] = []

            const createInvoice = await Promise.all(
                req.body.data.map((async (invoiceData:any) => {
                    try {
                        const invoice = await Invoices.create(invoiceData, {transaction});
                        return invoice
                    } catch (error:any) {
                        let data = {
                            data_input: {},
                            log_error: <any>[]
                        };
                        let log: any[] = [];
                        error.errors.forEach((r: any) => {
                            
                            data = {
                                data_input : {
                                    invoice_no : r.instance.invoice_no,
                                    customer_name: r.instance.customer_name,
                                    salesperson_name: r.instance.salesperson_name,
                                    payment_type: r.instance.payment_type,
                                    notes: r.instance.notes
                                },
                                log_error: []
                            }
                            log.push(`error in column ${r.path}, ${r.message}`);
                        })
                        data.log_error = log;
                        dataError.push(data);
                        return {error, data: invoiceData}
                    }
                }))
            )
            
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
            })
            await transaction!.commit();
            console.log('Data berhasil ditambahkan ke database:');
        } catch (error:any) {
            await transaction!.rollback();
            // const failedUsers = req.body.data.filter((invoice:any, index: number) => error.errors[index]);
            console.error('Data gagal ditambahkan ke database:');
            // res.status(200).send(failedUsers);
        }
    }

    static async updateInvoices(req:Request, res: Response) {
        try{

            const dataInvoice: InvoiceInterface = req.body.data;
            const newInvoice = {...dataInvoice};

            for(let k in newInvoice) {
                const key = k as keyof typeof newInvoice;
                if(newInvoice[key] === undefined || newInvoice[key] === null) {
                    delete(newInvoice[key]);
                }
            }

            const invoice = await Invoices.update(newInvoice, {
                where: {
                    invoice_no: newInvoice.invoice_no
                }
            });
            res.status(200).json({
                message: 'success update row',
                count_update: invoice
            })
        } catch (error) {
            console.error('Error input invoices:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async deleteInvoices(req:Request, res: Response) {
        try{

            const dataInvoice: InvoiceInterface = req.body.data;
            const newInvoice = {...dataInvoice};

            const invoice = await Invoices.destroy({where: {
                invoice_no: newInvoice.invoice_no
            }});
            res.status(200).json({
                message: 'success delete row',
                delete_count: invoice
            })
        } catch (error:any) {
            console.error('Error input invoices:', error);
            res.status(500).send(error?.name);
        }
    }

}

export default InvoicesController;