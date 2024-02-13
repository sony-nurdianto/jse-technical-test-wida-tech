CREATE TABLE `sales_database`.`products`( 
	`product_id` int primary key auto_increment unique,
    `item_name` varchar(225) not null check(character_length(`item_name`) >= 2),
    `description` text check(character_length(`description`) >= 5),
    `quantity` int not null check(`quantity` >=1),
    `total_cost_of_good_sold` int not null check(`total_cost_of_good_sold` >=1),
    `total_price_sold` int not null check(`total_price_sold` >=1),
	`created_at` timestamp not null default current_timestamp,
    `updated_at` timestamp not null default current_timestamp,
    foreign key (`invoice_no`) references `sales_database`.`invoices` (`invoice_no`)
);
