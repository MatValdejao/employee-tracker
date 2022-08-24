const express = require("express");
const db = require("./db/connection");
const inquirer = require("inquirer");

const PORT = 3001 || process.env.PORT;
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use((req, res) => {
    res.status(400).end();
})

// connect to database
db.connect((err) => {
    if (err) throw err;
    console.log("Database connected")
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
})

const theOptions = () => {
    inquirer.prompt([
        // checks what the user wants to do
        {
            type: "list",
            name: "chooseOption",
            message: "What would you like to do?",
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
        },
        // performs functionality dependent on the user answer
    ]).then(({ chooseOption }) => {
        // calls specific functions
        switch (chooseOption) {
            // call cases call a specific function to deal with it
            case "View All Employess":
                showEmployees();
                break;
            case "View All Roles":
                showRoles();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateRole();
                break;
            case "Add Role":
                addRole();
                break;
            case "View All Departments":
                showDepartments();
                break;
            case "Add Department":
                addDepartment();
                break;
            default:
                process.exit()
        }
    })
        // set up switch statement  
    
}

theOptions()