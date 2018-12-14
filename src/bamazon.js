let inquirer = require("inquirer");
let chalk = require("chalk");
let customer = require("./bamazonCustomer");
let manager = require("./bamazonManager");

const CUSTOMER = "Customer";
const MANAGER = "Manager";
const SUPERVISOR = "Supervisor";

// list of questions for the prompt
let questions = [
    {
        type: "list",
        name: "userType",
        message: "Please choose your user type",
        choices: [CUSTOMER, MANAGER, SUPERVISOR]
    }
]

// function which prompts the user for what action they should take
let start = () =>{
    inquirer
        .prompt(questions)
        .then(answer => {
            if(answer.userType === CUSTOMER){
                customer.loadInventoryScreen();
            }
            else if(answer.userType === MANAGER){
                manager.loadInventoryScreen();
            }
            else if(answer.userType === SUPERVISOR){
                console.log(chalk.red(`\n Functionality is not yet released \n`));
                start();
            }
        });
    }

start();

