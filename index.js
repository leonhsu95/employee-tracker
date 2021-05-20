const mysql = require('mysql');
const inquirer = require('inquirer');

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
    confirmConnection();
});

const confirmConnection = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
};