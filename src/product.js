let database = require("./database");

let Product = function (id, productName, departmentId, price, quantity) {
    this.id = id,
        this.productName = productName,
        this.departmentId= departmentId,
        this.price = price,
        this.quantity = quantity
}

let update = (id, quantity) => {
    return new Promise((resolve, reject) => {
        database.connection()
            .then((conn) => {
                let result = conn.query(
                    "update products set ? where ?",
                    [
                        {
                            stock_quantity: quantity
                        },
                        {
                            item_id: id
                        }
                    ]
                )
                return result;
                conn.end();
            })
            .then((results) => {
                resolve("Product quantity updated");
            })
    });
}

let purchase = (id, quantity) => {
    return new Promise((resolve, reject) => {
        database.connection()
            .then((conn) => {
                let sql = `select * from bamazon.products where item_id = ?`
                let result = conn.query(sql, [id]);
                conn.end();
                return result;
            })
            .then((results) => {
                results.map((result) => {
                    let currentQuantity = result.stock_quantity;
                    let price = result.price;
                    if (currentQuantity >= quantity) {
                        return update(id, currentQuantity - quantity)
                            .then((results) => {
                                results.salePrice = price * quantity;
                                resolve(price * quantity);
                            });
                    }
                    else {
                        reject("Insufficient quantity!");
                    }
                })
            })
    }
    );
}

let addToInventory = (id, quantity) => {
    return new Promise((resolve, reject) => database.connection()
        .then((conn) => {
            let sql = "select stock_quantity from products where item_id = ?"
            let result = conn.query(sql, [id]);
            conn.end();
            return result;
        })
        .then((result) => {
            quantity += result[0].stock_quantity;
            return update(id, quantity)
                .then((results) => {
                    resolve("Inventory has been udpated!");
                });
        }))
        .catch((error) => {
            console.log(`error: ${error}`);
        }
        )
}

let addProduct = (name, department, price, quantity) => {
    return new Promise((resolve, reject) => database.connection()
        .then((conn) => {
            let sql = "insert into bamazon.products (product_name, department_id, price, stock_quantity, product_sales) values (?, ?, ?, ?, ?)"
            let result = conn.query(sql, [name, department, price, quantity, 0.00]);
            conn.end();
            return result;
        })
        .then((result) => {
            resolve("Product sucessfully added");
        }))
        .catch((error) => {
            console.log(`error: ${error}`);
        }
        )
}


module.exports = Product;
module.exports.purchase = purchase;
module.exports.addToInventory = addToInventory;
module.exports.addProduct = addProduct;