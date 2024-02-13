create  view  `sales_database`.`invoice_details` as
select 
	i.invoice_no,
	i.customer_name,
    i.salesperson_name,
    i.notes,
    i.payment_type,
    p.product_id,
    p.item_name,
    p.quantity,
    p.total_cost_of_good_sold,
    p.total_price_sold,
    (p.total_price_sold - p.total_cost_of_good_sold) as profit,
    i.date
from 
	`sales_database`.`invoices` i
join 
	`sales_database`.`products` p on ps.invoice_no = i.invoice_no;