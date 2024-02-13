# WidaTech
## _Junior Software Engineer Technical Test_

This repository is divided into 2 folders, the first Express folder and the second Algorithm folder.

The first folder, namely Express, consists of Section 1 and Section 2.

Section 1 Develop a CRUD API for invoice page and Section 2 Import and parse CSV file to MySQL / PostgresSQL.

## Installation

Install the dependencies and devDependencies and start the server.

```sh
cd Express
npm install
npm run build
npm run start
```
## GetInvoiceDetails API 
This api is used to retrieve invoice details data using HTTP Method POST
```sh
    http://localhost:8080/invoice-details
```
have a Request Body
```json
{
    "data": {
        "start_date": "2024-02-12T09:34:49.000Z",
        "end_date": "2024-02-13T10:34:49.000Z",
        "limit": 5,
        "page": 0
    }
}
```
this api have fillter base on date and have a data limit and data offset as page.

start_date and end_date can be null or undefiend , if you decide to not input start_date and end_date by default it will show all without filltering date .

limit by default is 5 and offset as page by default is 0;

if you decide not input fillter please at least input :

```json
{
    "data": {}
}
```

to prevent Error . or you can use

```sh
    http://localhost:8080/invoice-details-all
```
To Get All Data Invoice-Details.

Both /invoice-details and invoice-details-all  it will return 
```json
[
    {
        "invoice_no": 1,
        "customer_name": "lex luthor",
        "salesperson_name": "DR.Manhattan",
        "notes": "Buy Anti Superman materials",
        "payment_type": "CASH",
        "product_id": 1,
        "item_name": "Cryptonite",
        "quantity": 10,
        "total_cost_of_good_sold": 1000,
        "total_price_sold": 10000,
        "profit": 9000,
        "date": "2024-02-12T23:07:46.000Z"
    },
    {
        "invoice_no": 1,
        "customer_name": "lex luthor",
        "salesperson_name": "DR.Manhattan",
        "notes": "Buy Anti Superman materials",
        "payment_type": "CASH",
        "product_id": 2,
        "item_name": "Doomsday Virus",
        "quantity": 1,
        "total_cost_of_good_sold": 10000,
        "total_price_sold": 100000,
        "profit": 90000,
        "date": "2024-02-12T23:07:46.000Z"
    },
    {
        "invoice_no": 1,
        "customer_name": "lex luthor",
        "salesperson_name": "DR.Manhattan",
        "notes": "Buy Anti Superman materials",
        "payment_type": "CASH",
        "product_id": 3,
        "item_name": "Clark Kent Information",
        "quantity": 1,
        "total_cost_of_good_sold": 100,
        "total_price_sold": 1000,
        "profit": 900,
        "date": "2024-02-12T23:07:46.000Z"
    },
    {
        "invoice_no": 2,
        "customer_name": "Batman",
        "salesperson_name": "Ninja",
        "notes": "Buy Dark Knight Tools",
        "payment_type": "CASH",
        "product_id": 4,
        "item_name": "Batarang",
        "quantity": 100,
        "total_cost_of_good_sold": 50,
        "total_price_sold": 500,
        "profit": 450,
        "date": "2024-02-12T23:09:09.000Z"
    },
    {
        "invoice_no": 2,
        "customer_name": "Batman",
        "salesperson_name": "Ninja",
        "notes": "Buy Dark Knight Tools",
        "payment_type": "CASH",
        "product_id": 5,
        "item_name": "Explosive Batarang",
        "quantity": 100,
        "total_cost_of_good_sold": 80,
        "total_price_sold": 8000,
        "profit": 7920,
        "date": "2024-02-12T23:09:09.000Z"
    }
]
```
## GetInvoice API
This api is used to retrieve invoice details data using HTTP Method POST
```sh
    http://localhost:8080/invoices
```
have a Request Body
```json
{
    "data": {
        "start_date": "2024-02-12T09:34:49.000Z",
        "end_date": "2024-02-13T10:34:49.000Z",
        "limit": 5,
        "page": 0
    }
}
```

This api is same like /invoice-details have same Reqeust Body for filltering data base on date.

This Api will return value: 

```json
[
    {
        "invoice_no": 1,
        "date": "2024-02-12T23:07:46.000Z",
        "customer_name": "lex luthor",
        "salesperson_name": "DR.Manhattan",
        "payment_type": "CASH",
        "notes": "Buy Anti Superman materials",
        "updated_at": "2024-02-12T23:07:46.000Z"
    },
    {
        "invoice_no": 2,
        "date": "2024-02-12T23:09:09.000Z",
        "customer_name": "Batman",
        "salesperson_name": "Ninja",
        "payment_type": "CASH",
        "notes": "Buy Dark Knight Tools",
        "updated_at": "2024-02-12T23:09:09.000Z"
    },
    {
        "invoice_no": 3,
        "date": "2024-02-12T23:10:42.000Z",
        "customer_name": "Wonder Women",
        "salesperson_name": "Samurai",
        "payment_type": "CREDIT",
        "notes": "Buy Amazon Lily Tools",
        "updated_at": "2024-02-12T23:10:42.000Z"
    }
]
```

if you decide to get all data invoice without filltering date or limit the amount of data or set the offset , you can use

```sh
  http://localhost:8080/invoices-all
```

to retrive all data invoices.

## InputInvoice API

```sh
    http://localhost:8080/input-invoice
```

This api is used to input data invoice using HTTP Method POST , and have Request Body

```sh
{
    "data": {
        "invoice_no": 8,
        "customer_name": "Slardar",
        "salesperson_name": "Mermaid",
        "payment_type": "CREDIT",
        "notes": "Buy Trident"
    }
}
```

## Body Request
| Plugin | README |
| ------ | ------ |
| invoice_no | Required , number , min_val (1) |
| customer_name | Required, String, min_length(2)|
| salesperson_name | Required, String, min_length(2) |
| payment_type | Required, enum('CASH'|'CREDIT') |
| note | String, min_length(5) |

if success will return 

```sh
{
    "date": {
        "val": "CURRENT_TIMESTAMP"
    },
    "updated_at": {
        "val": "CURRENT_TIMESTAMP"
    },
    "invoice_no": 8,
    "customer_name": "Slardar",
    "salesperson_name": "Mermaid",
    "payment_type": "CREDIT",
    "notes": "Buy Trident"
}
```

## Update invoice API 

```sh 
    http://localhost:8080/update-invoice
```

This api is used to update data invoice using HTTP Method PUT , and have Request Body

```sh
{
    "data": {
        "invoice_no": 8,
        "customer_name": "Slardar",
        "salesperson_name": "Mermaid",
        "payment_type": "CREDIT",
        "notes": "Buy Trident",
        "created_at": "2024-02-12",
        "update_at": "2024-02-12"
    }
}
```

## Body Request
| Plugin | README |
| ------ | ------ |
| invoice_no | Required , number , min_val (1) |
| customer_name | NOT Required, String, min_length(2)|
| salesperson_name | NOT Required, String, min_length(2) |
| payment_type | NOT Required, enum('CASH'|'CREDIT') |
| note | String, NOT min_length(5) |
| created_at | NOT Required, format  'yyyy-mm-dd' |
| update_at | NOT Required, String, format  'yyyy-mm-dd' |

by default if you not input one of the Body Request except invoice_no data in database will not changes.

then if success will return 

```sh
{
    "message": "success update row",
    "count_update": [
        1
    ]
}
```

## Delete invoice API

```sh
    http://localhost:8080/delete-invoice
```

this api used to delete invoice data with HTTP Method POST , have body request

```sh
{
    "data": {
        "invoice_no": 8
    }
}
```

if success deleteing invoice data will return 

```sh
{
    "message": "success delete row",
    "delete_count": 1
}
```

## Get Products API

```sh
    http://localhost:8080/products
```

This API used to get data products using HTTP Method POST and have same Body Request like the other APi Get 

```sh
{
    "data": {
        "start_date": "2024-02-12T09:34:49.000Z",
        "end_date": "2024-02-13T10:34:49.000Z",
        "limit": 5,
        "page": 0
    }
}
```

it will return data products

```sh
[
    {
        "product_id": 1,
        "invoice_no": 1,
        "item_name": "Cryptonite",
        "quantity": 10,
        "total_cost_of_good_sold": 1000,
        "total_price_sold": 10000,
        "created_at": "2024-02-12T23:13:16.000Z",
        "updated_at": "2024-02-12T23:13:16.000Z"
    },
    {
        "product_id": 2,
        "invoice_no": 1,
        "item_name": "Doomsday Virus",
        "quantity": 1,
        "total_cost_of_good_sold": 10000,
        "total_price_sold": 100000,
        "created_at": "2024-02-12T23:13:53.000Z",
        "updated_at": "2024-02-12T23:13:53.000Z"
    },
    {
        "product_id": 3,
        "invoice_no": 1,
        "item_name": "Clark Kent Information",
        "quantity": 1,
        "total_cost_of_good_sold": 100,
        "total_price_sold": 1000,
        "created_at": "2024-02-12T23:14:28.000Z",
        "updated_at": "2024-02-12T23:14:28.000Z"
    },
    {
        "product_id": 4,
        "invoice_no": 2,
        "item_name": "Batarang",
        "quantity": 100,
        "total_cost_of_good_sold": 50,
        "total_price_sold": 500,
        "created_at": "2024-02-12T23:16:17.000Z",
        "updated_at": "2024-02-12T23:16:17.000Z"
    },
    {
        "product_id": 5,
        "invoice_no": 2,
        "item_name": "Explosive Batarang",
        "quantity": 100,
        "total_cost_of_good_sold": 80,
        "total_price_sold": 8000,
        "created_at": "2024-02-12T23:16:43.000Z",
        "updated_at": "2024-02-12T23:16:43.000Z"
    }
]
```

if you decide to get all without aplying fillter , you can use

```sh
    http://localhost:8080/products
```

it will get all data Products.

## Input Product API

```sh
    http://localhost:8080/input-product
```

This Api is used to Input Data Product using HTTP Method POST and have Request Body

```sh
{
    "data": {
        "item_name": "Trident",
        "invoice_no": 8,
        "quantity": 1,
        "total_cost_of_good_sold": 2000,
        "total_price_sold": 3000,
        "created_at": "2024-02-12",
        "updated": "2024-02-12"
    }
}
```

## Body Request
| Plugin | README |
| ------ | ------ |
| item_name | Required , Number , min_length (2) |
| invoice_no | Required, Number ,Refrence to invoices table invoice_no|
| quantity |Required, Number, min_value(1) |
| total_cost_of_good_sold | Required, Number , min_value(1) |
| total_price_sold | Required, Number , min_value(1) |
| created_at | NOT Required, format  'yyyy-mm-dd' |
| update_at | NOT Required, String, format  'yyyy-mm-dd' |

if success input data product this API will return 

```sh
{
    "created_at": {
        "val": "CURRENT_TIMESTAMP"
    },
    "updated_at": {
        "val": "CURRENT_TIMESTAMP"
    },
    "product_id": 127,
    "item_name": "Trident",
    "invoice_no": 8,
    "quantity": 1,
    "total_cost_of_good_sold": 2000,
    "total_price_sold": 3000
}
```

## Update Product API

```sh
    http://localhost:8080/update-product
```

This API Used to update product data using HTTP METHOD PUT Have Body Request 

```sh
{
    "data": {
        "product_id": 9,
        "item_name": "Blade Mail",
        "invoice_no": 8,
        "quantity": 1,
        "total_cost_of_good_sold": 2000,
        "total_price_sold": 3000,
        "created_at": "2024-02-12",
        "updated": "2024-02-12"
    }
}
```

product_id is required but other is not if you decide just input some field the other field you not input will not affect or change data product in database , data will change when you add some field above.

if success update will return

```sh
{
    "message": "success update row",
    "update_count": [
        1
    ]
}
```

## Delete Product API

```sh
    http://localhost:8080/delete-products
```

this API used to Delete data products using HTTP Method Post have Request Body

```sh
{
    "data": {
        "product_id": 1
    }
}
```

if success delete data this API will return

```sh
{
    "message": "success delete row",
    "delete_count": 1
}
```

## Upload Invoice API

```
http://localhost:8080/upload-invoice
```

This Api is used to Import and parse xlsx file to database using HTTP Method POST Have a body request form-data with key file and value your xlsx file

if success will return 

```sh
{
    "invoice": {
        "data_success": [
                {
                    "updated_at": {
                        "val": "CURRENT_TIMESTAMP"
                    },
                    "invoice_no": 8,
                    "customer_name": "Weaver",
                    "salesperson_name": "Nyx Assasin",
                    "payment_type": "CREDIT",
                    "notes": "okey subharshi",
                    "date": "1970-01-01T00:00:45.340Z"
            }
        ],
        "data_failed": [
            {
                "data_input": {
                    "invoice_no": 8,
                    "customer_name": "Weaver",
                    "salesperson_name": "Nyx Assasin",
                    "payment_type": "CREDIT",
                    "notes": "okey"
                },
                "log_error": [
                    "error in column notes, Validation len on notes failed"
                ]
            }
        ]
    },
    "product": {
        "data_success": [
                {
                    "created_at": {
                        "val": "CURRENT_TIMESTAMP"
                    },
                    "updated_at": {
                        "val": "CURRENT_TIMESTAMP"
                    },
                    "product_id": 130,
                    "invoice_no": 8,
                    "item_name": "geminite",
                    "quantity": 2,
                    "total_cost_of_good_sold": 200,
                    "total_price_sold": 2000
            }
        ],
        "data_failed": [
            {
                "data_input": {
                    "invoice_no": 8,
                    "item_name": "geminite",
                    "quantity": 2,
                    "total_cost_of_good_sold": 200,
                    "total_price_sold": 2000
                },
                "log_error": [
                    "Cannot add or update a child row: a foreign key constraint fails (`sales_database`.`products`, CONSTRAINT `products_ibfk_1` FOREIGN KEY (`invoice_no`) REFERENCES `invoices` (`invoice_no`))"
                ]
            }
        ]
    }
}
```

