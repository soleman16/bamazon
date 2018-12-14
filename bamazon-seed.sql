insert into bamazon.departments
	(department_name, over_head_costs)
values
	('Books', 20000),
	('Beauty & Personal Care', 10000),
    ('Software', 50000),
    ('Baby', 100000);

insert into bamazon.products
	(product_name, department_id, price, stock_quantity, product_sales)
values
	('Serverless Architectures On AWS', 1, 38.99, 20, 0.00),
    ('Amazon Web Services In Action', 1, 42.30, 50, 0.00),
	('Microservices Patterns: With examples in Java', 1, 49.99, 78, 0.00),
	('Philips Norelco OneBlade Pro', 2, 89.88, 50, 0.00),
    ('Waterpik WP-660 Aquarius Water Flosser', 2, 59.99, 98, 0.00),
    ('Office 365 Home', 3, 79.99, 1000, 0.00),
    ('Norton Security Deluxe', 3,  34.99, 500, 0.00),
    ('Baby Trend Rocket Lightweight Stroller', 4, 49.99, 2, 0.00),
     ('Pampers Swaddlers Disposable Diapers Size 4', 4, 42.30, 50, 0.00),
    ('Delta Children Abby Convertible Crib', 4, 272.99, 4, 0.00);