drop database if exists bamazon;

create database bamazon;

create table bamazon.departments(
	department_id int not null auto_increment primary key,
    department_name varchar(50),
    over_head_costs float
);

create table bamazon.products(
	item_id int not null auto_increment primary key,
	product_name varchar(100),
    department_id int,
    price float,
    stock_quantity int,
    product_sales float,
    foreign key (department_id) references bamazon.departments(department_id)
);
     