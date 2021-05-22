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

async function init(){
    inquirer
    .prompt({
      name: 'menu',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'View All Employees By Department',
        'View All Employees By Manager',
        'Add Employee',
        'Remove Employee',
        'Update Employee Role',
        'Update Employee Manager',
        'Quit'
      ],
    })
    .then((answer) => {
        if (answer.menu === "View All Employees") {
            searchEmployees();
        }
        if (answer.menu === "View All Employees By Department") {
            searchEmployeeDepartment();
        }
        else{
            console.log("Thank you. Goodbye.")
            connection.end();
        }
    })
};

connection.connect((err) => {
    if (err) throw err;
    console.log(logo(config).render());
    init();
});

const searchEmployees = () => {
    connection.query('SELECT employee_id AS `ID`, first_name AS `First Name`, last_name AS `Last Name`, title AS Position, `name` AS Department, salary AS Salary, manager_id FROM employee e, `role` r, department d WHERE e.role_id = r.role_id AND d.department_id = r.department_id ORDER BY employee_id;', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

const  searchEmployeeDepartment = () => {
    connection.query('SELECT employee_id AS `ID`, first_name AS `First Name`, last_name AS `Last Name`, title AS Position, `name` AS Department, salary AS Salary, manager_id FROM employee e, `role` r, department d WHERE e.role_id = r.role_id AND d.department_id = r.department_id ORDER BY d.name;', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};