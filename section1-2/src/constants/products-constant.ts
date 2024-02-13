export interface ProductInterface {
    product_id?: number;
    invoice_no: number;
    item_name: string;
    quantity: number;
    total_cost_of_good_sold: number;
    total_price_sold: number;
    created_at?: string;
    updated_at?: string;
}