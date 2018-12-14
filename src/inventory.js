let database = require("./database");
let Product = require("./product");

/**
 * Returns the entire Inventory(wraps a product collection)
 */
let getInventory = () => {
    return new Promise((resolve, reject) => database.connection()
        .then((conn) => {
            let sql = `select * from bamazon.products inner join
                bamazon.departments ON bamazon.products.department_id=bamazon.departments.department_id`;
            conn.query(sql)
                .then((results) => {
                    let productArray = [];
                    results.map((result, i) => {
                        let product = new Product(result.item_id,
                            result.product_name,
                            result.department_id,
                            result.price,
                            result.stock_quantity);
                        product.departmentName = result.department_name;
                        productArray.push(product);
                        if (results.length === i + 1) {
                            resolve(productArray);
                        }
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
            conn.end();
        }))
        .catch((error) => {
            console.log(error);
        }
        )
}

let getLowInventory = () => {
    return new Promise((resolve, reject) => database.connection()
        .then((conn) => {
            let sql = `select * from bamazon.products inner join
            bamazon.departments ON bamazon.products.department_id=bamazon.departments.department_id
            where stock_quantity < 5`;
            conn.query(sql)
                .then((results) => {
                    let productArray = [];
                    results.map((result, i) => {
                        let product = new Product(result.item_id,
                            result.product_name,
                            result.department_id,
                            result.price,
                            result.stock_quantity);
                        product.departmentName = result.department_name;
                        productArray.push(product);
                        if (results.length === i + 1) {
                            resolve(productArray);
                        }
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
            conn.end();
        }))
        .catch((error) => {
            console.log(error);
        }
        )
}

module.exports.getInventory = getInventory;
module.exports.getLowInventory = getLowInventory;