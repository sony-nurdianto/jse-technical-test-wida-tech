CREATE TABLE `sales_database`.`invoices`( 
    `invoice_no` int not null check(`invoice_no` >= 1) primary key unique,
    `date` timestamp not null default current_timestamp,
    `customer_name` varchar(225) not null check(character_length(customer_name) >= 2),
    `salesperson_name` varchar(225) not null check(character_length(salesperson_name) >=2),
    `payment_type` enum('CASH', 'CREDIT') not null,
    `notes` text check(character_length(notes) >= 5),
    `updated_at` timestamp not null default current_timestamp
);
