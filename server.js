const express = require("express");
const db = require("./db/connection");
const inquirer = require("inquirer");

// connect to database
db.connect((err) => {
    if (err) throw err;
    console.log("Database connected")
});

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
            case "View All Employees":
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
}

// add employee function
const addEmployee = () => {
    // prompt user for employee first name, last name, role, and manager
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?"
        },
        {
            type: "list",
            name: "role",
            message: "What is the employee's role?",
            choices: listRoles()
        },
        {
            type: "list",
            name: "manager",
            message: "Who is the employee's manager?",
            choices: listManagers()
        }
    ]).then((data) => {
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        const params = [data.first_name, data.last_name, null, null]
            
        db.query(sql, params, (err, result) => {
            console.log(`Added ${params[0]} ${params[1]} to the database.`)
        })
    })
}

const showEmployees = () => {
    // query
    const sql = `SELECT * FROM employees`;

    db.query(sql, (err, results) => {
        console.table(results);
        theOptions()
    });
}

const showRoles = () => {
    // query
    const sql = `SELECT * FROM roles`;

    db.query(sql, (err, results) => {
        console.table(results);
        theOptions()
    });
}

const listRoles = () => {
    // query definition
    const sql = `SELECT * FROM roles`;

    const titles = [];
    
    db.query(sql, (err, results) => {
        // maps only for role title
        results.map(({ title }) => {
            titles.push(title)
        })
    })
    return titles;
}

const listManagers = () => {
    // query definition
    const sql = `SELECT * FROM employees`;

    const managers = [];

    db.query(sql, (err, results) => {
        // maps for employee name
        results.map(({ first_name, last_name }) => {
            managers.push(`${first_name} ${last_name}`);
        })
    })
    return managers;
}

theOptions()