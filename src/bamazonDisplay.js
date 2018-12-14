let Table = require("cli-table");

let displayScreen = (results) =>{
    let table = createTable();
    results.map((result, i) =>{
        table.push([result.id, 
                result.productName, 
                `${result.departmentName}(${result.departmentId})`, 
                result.price, 
                result.quantity]);
    });
    console.log(`\n ${table.toString()} \n`);
}


// instantiate
let createTable = () => { 
    return new Table({
        head: ['item_id', 'product_name', 'department_id', 'price', 'stock_quantity'],
        colWidths: [25, 50, 50, 25, 25]})
};

module.exports.displayScreen = displayScreen;