const mysql = require("mysql2");

// setup database connection
const db = mysql.createConnection(
	{
		host: "localhost",
		user: "root",
		password: "jR9h4CCDh8",
		database: "company",
	},
	console.log("Connected to database.")
);

module.exports = db;
