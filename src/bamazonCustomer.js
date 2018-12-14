let inquirer = require("inquirer");
let product = require("./product");
let inventory = require("./inventory");
let bamazonDisplay = require("./bamazonDisplay");
let chalk = require("chalk");

// list of questions for the prompt
let questions = [
    {
        type: "input",
        name: "id",
        message: "Please enter the ID of the product you would like to buy",
    },
    {
        type: "input",
        name: "quantity",
        message: "Please enter the quauntity of the product you would like to buy",
    },
]

// function which prompts the user for what action they should take
let start = () => {
    inquirer.prompt(questions)
        .then(answer => {
            product.purchase(answer.id, answer.quantity)
                .then((result) => {
                    console.log(chalk.green(`\n The cost of your purchase is: ${result} \n`))
                    loadInventoryScreen();
                })
                .catch((error) => {
                    console.log(chalk.red(`\n ${error} \n`));
                    loadInventoryScreen();
                });
        })
        .catch(error => {
            console.log(error);
        });
}

let loadInventoryScreen = () => {
    inventory.getInventory()
        .then((response) => {
            bamazonDisplay.displayScreen(response);
            start();
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports.loadInventoryScreen = loadInventoryScreen;


