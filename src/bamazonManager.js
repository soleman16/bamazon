let inquirer = require("inquirer");
let product = require("./product");
let inventory = require("./inventory");
let bamazonDisplay = require("./bamazonDisplay");
let chalk = require("chalk");


const VIEW_PRODUCTS_FOR_SALE = "View Products for Sale";
const VIEW_LOW_INVENTORY = "View Low Inventory";
const ADD_TO_INVENTORY = "Add to Inventory";
const ADD_NEW_PRODUCT = "Add New Product";

// list of questions for the prompt
let questions = [
    {
        type: "list",
        name: "menuItem",
        message: "Please select an option:",
        choices: [VIEW_PRODUCTS_FOR_SALE, VIEW_LOW_INVENTORY, ADD_TO_INVENTORY, ADD_NEW_PRODUCT],
    },
    {
        type: "input",
        name: "productName",
        message: "What's the product name?",
        when: (answers) => {
            if (answers.menuItem === ADD_NEW_PRODUCT) {
                return answers.menuItem === ADD_NEW_PRODUCT;
            }
        }
    },
    {
        type: "input",
        name: "productPrice",
        message: "What's the product price?",
        when: (answers) => {
            if (answers.menuItem === ADD_NEW_PRODUCT) {
                return answers.menuItem === ADD_NEW_PRODUCT;
            }
        }
    },
    {
        type: "input",
        name: "productQuantity",
        message: "What's the product quantity?",
        when: (answers) => {
            if (answers.menuItem === ADD_NEW_PRODUCT) {
                return answers.menuItem === ADD_NEW_PRODUCT;
            }
        }
    },
    {
        type: "input",
        name: "department",
        message: "What's the department id?",
        when: (answers) => {
            if (answers.menuItem === ADD_NEW_PRODUCT) {
                return answers.menuItem === ADD_NEW_PRODUCT;
            }
        }
    },
    {
        type: "input",
        name: "productId",
        message: "What's the product id?",
        when: (answers) => {
            if (answers.menuItem === ADD_TO_INVENTORY) {
                return answers.menuItem === ADD_TO_INVENTORY;
            }
        }
    },
    {
        type: "input",
        name: "quantity",
        message: "How many units do you want to add?",
        when: (answers) => {
            if (answers.menuItem === ADD_TO_INVENTORY) {
                return answers.menuItem === ADD_TO_INVENTORY;
            }
        }
    }
]

// function which prompts the user for what action they should take
let start = () => {
    inquirer.prompt(questions)
        .then(answer => {
            if (answer.menuItem === VIEW_PRODUCTS_FOR_SALE) {
                inventory.getInventory()
                    .then((response) => {
                        bamazonDisplay.displayScreen(response);
                        start();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            else if (answer.menuItem === VIEW_LOW_INVENTORY) {
                inventory.getLowInventory()
                    .then((response) => {
                        bamazonDisplay.displayScreen(response);
                        start();
                    })
                    .catch((error) => {
                        console.log(error);
                    });

            }
            else if (answer.menuItem === ADD_TO_INVENTORY) {
                product.addToInventory(parseInt(answer.productId), parseInt(answer.quantity))
                    .then((response) => {
                        console.log(chalk.green(`\n${response}\n`))
                        start();
                    })
                    .catch((error) => {
                        console.log(error);
                    });

            }
            else if (answer.menuItem === ADD_NEW_PRODUCT) {
                product.addProduct(answer.productName,
                    parseInt(answer.department),
                    parseFloat(answer.productPrice),
                    parseInt(answer.productQuantity))
                    .then((response) => {
                        console.log(chalk.green(`\n${response}\n`))
                        start();
                    })
            }
        });
}

let loadInventoryScreen = () => {
    start();
}

module.exports.loadInventoryScreen = loadInventoryScreen;