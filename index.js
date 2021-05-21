const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');
const logo = require('asciiart-logo');
const config = require('./package.json');

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'user',

  // Your password
  password: 'password',
  database: 'database_name',
});
connection.connect((err) => {
    if (err) throw err;
    console.log(logo(config).render());
    confirmConnection();
});

const confirmConnection = () => {
    connection.query('SELECT employee_id, first_name, last_name, title, `name` AS department, salary, manager_id FROM employee e, `role` r, department d WHERE e.role_id = r.role_id AND d.department_id = r.department_id ORDER BY employee_id;', (err, res) => {
        if (err) throw err;
        console.table(res);
        connection.end();
    });
};