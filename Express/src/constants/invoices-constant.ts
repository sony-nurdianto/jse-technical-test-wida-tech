export interface InvoiceInterface  {
    invoice_no: number;
    date?: string | number;
    customer_name: string;
    salesperson_name: string;
    payment_type: 'CASH' | 'CREDIT';
    notes: string;
    updated_at?: string | number;
} 