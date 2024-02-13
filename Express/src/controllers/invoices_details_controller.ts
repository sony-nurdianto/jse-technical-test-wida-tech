import {Request , Response} from 'express';
import { Op } from 'sequelize';
import InvoiceDetails from '../models/invoices_details';
import { FillterInterface } from '../constants/fillter-constant';


class InvoicesDetailsController {
    static async getInvoicesDetailAll(req: Request, res: Response) {
        try {
            const invoicesDetails = await InvoiceDetails.findAll();
            res.status(200).json(invoicesDetails);
        } catch (error) {
            console.error('Error get invoices Details:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async getInnvoicesDetail(req: Request, res: Response) {
        try {
            const data: FillterInterface = req?.body?.data;
            const invoiceDetails = await InvoiceDetails.findAll(
                 {
                    where: data.start_date && data.end_date ? {
                        date: {
                            [Op.between]: [data?.start_date, data?.end_date]
                        },
                    } : {},
                    limit: data?.limit || 5,
                    offset: data?.page || 0,
                }
            );

            res.status(200).json(invoiceDetails);
        } catch (error) {
            console.error('Error get invoices Detail:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}

export default InvoicesDetailsController;