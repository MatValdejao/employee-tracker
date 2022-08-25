const express = require("express");
const db = require("./db/connection");
const inquirer = require("inquirer");
require("console.table")

// connect to database
db.connect((err) => {
	if (err) throw err;
	console.log("Database connected");
});

const theOptions = () => {
	inquirer
		.prompt([
			// checks what the user wants to do
			{
				type: "list",
				name: "chooseOption",
				message: "What would you like to do?",
				choices: [
					"View All Employees",
					"Add Employee",
					"Update Employee Role",
					"View All Roles",
					"Add Role",
					"View All Departments",
					"Add Department",
					"Quit",
				],
			},
			// performs functionality dependent on the user answer
		])
		.then(({ chooseOption }) => {
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
					process.exit();
			}
		});
};

// add role function
const addRole = () => {

    // query definition
	const sql = `SELECT * FROM departments`;

    // query to display department options
    db.query(sql, (err, results) => {
			// maps only for role title
			const departments = results.map(({ name, id }) => {
				return {
					name: name,
					value: id,
				};
			});
			// inquire role title, salary, department_id
			inquirer
				.prompt([
					{
						type: "input",
						name: "title",
						message: "What is the name of the role?",
					},
					{
						type: "input",
						name: "salary",
						message: "What is the salary of the role?",
					},
					{
						type: "list",
						name: "department_id",
						message: "What department does the role belong to?",
						choices: departments,
					},
				])
				.then(({ title, salary, department_id }) => {
					const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
					// what to add to table
					const params = [title, salary, department_id];

					// run query as promise to await 
					db.promise().query(sql, params, (err, result) => {
						console.log(`Added ${params[0]} to the database`);
					}).then(theOptions());
				});
		});
};

// add department function
const addDepartment = () => {
	// inquire role title, salary, department_id
	inquirer
		.prompt([
			{
				type: "input",
				name: "name",
				message: "What is the name of the department?",
			},
		])
		.then((data) => {
			const sql = `INSERT INTO departments (name) VALUES (?)`;
			// what to add to table
            const params = [data.name];

			// run query as promise to await
			db.promise().query(sql, params, (err, result) => {
				console.log(`Added ${params[0]} to the database`);
			}).then(theOptions());;
		})
};

// add employee function
const addEmployee = () => {
    // sql query to find roles and manager options
    let sql = `SELECT roles.title, roles.id AS role_id FROM roles`

    // run query
    db.query(sql, (err, results) => {
        // roles array
        const roles = results.map(({ title, role_id }) => {
            return {
                name: title,
                value: role_id
            }
        })
        // changing query
        sql = `SELECT CONCAT(employees.first_name, " ", employees.last_name) AS manager, employees.id AS employee_id FROM employees`
        // second query
        db.query(sql, (err, results) => {
            // managers array
            const managers = results.map(({ manager, employee_id }) => {
                return {
                    name: manager,
                    value: employee_id
                }
            });

            // add option not to add manager
            managers.push("None")

            // prompt user for employee first name, last name, role, and manager
            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "first_name",
                        message: "What is the employee's first name?",
                    },
                    {
                        type: "input",
                        name: "last_name",
                        message: "What is the employee's last name?",
                    },
                    {
                        type: "list",
                        name: "roleID",
                        message: "What is the employee's role?",
                        choices: roles,
                    },
                    {
                        type: "list",
                        name: "managerID",
                        message: "Who is the employee's manager?",
                        choices: managers,
                    },
                ])
                .then((data) => {
                    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;

                    // check whether answer was none
                    if (data.managerID === "None") {
                        data.managerID = null
                    }

                    // what to add to table
                    const params = [data.first_name, data.last_name, data.roleID, data.managerID];

                    // running query to add to table as promise
                    db.promise().query(sql, params, (err, result) => {
                        console.log(`Added ${params[0]} ${params[1]} to the database`);
                    }).then(theOptions());
                });
        });
    })
};

const showEmployees = () => {
	// query definition
	const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title AS title, departments.name AS department, roles.salary AS salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM Employees employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN Employees manager ON employees.manager_id = manager.id`;

	db.query(sql, (err, results) => {
		console.table(results);
		theOptions();
	});
};

const showRoles = () => {
	// query definition
	const sql = `SELECT roles.id, roles.title, departments.name AS department, roles.salary FROM roles LEFT JOIN departments ON roles.department_id = departments.id`;

	db.query(sql, (err, results) => {
		console.table(results);
		theOptions();
	});
};

const showDepartments = () => {
	// query definition
	const sql = `SELECT * FROM departments`;

	db.query(sql, (err, results) => {
		console.table(results);
		theOptions();
	});
};

theOptions()
