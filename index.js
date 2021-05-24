const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');
const logo = require('asciiart-logo');
const config = require('./package.json');
const {allEmpQuery, empDepartmentQuery, empManagerQuery, allRolesQuery} = require('./db/queries');

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
        'View All Managers',
        'Add Employee',
        'Remove Employee',
        'Update Employee Role',
        'Update Employee Manager',
        'View All Roles',
        'Quit'
      ],
    })
    .then((answer) => {
        return answer.menu === "View All Employees" ? searchEmployees():
        answer.menu === "View All Employees By Department" ? searchEmployeeDepartment() :
        answer.menu === "View All Managers" ? searchEmployeeManager():
        answer.menu === "Add Employee" ? addEmployee():
        answer.menu === "Remove Employee" ? removeEmployee():
        answer.menu === "Update Employee Role" ? updateRole():
        answer.menu === "Update Employee Manager" ? updateManager():
        answer.menu === "View All Roles" ? searchRoles():
        
        connection.end()
    })
    
};

connection.connect((err) => {
    if (err) throw err;
    console.log(logo(config).render());
    init();
});

async function searchEmployees() {
    connection.query(allEmpQuery, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

async function searchEmployeeDepartment () {
    connection.query(empDepartmentQuery, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

async function searchEmployeeManager () {
    connection.query(empManagerQuery, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

async function addEmployee(){
    inquirer
      .prompt([  
    {
        type: "input",
        name: "newEmpFName",
        message: "Please enter employee First Name.", 
    }, 
    {
        type: "input",
        name: "newEmpLName",
        message: "Please enter employee Last Name.",  
    },
    {
        type: "list",
        name: "newEmpRole",
        message: "What is the employee's role?", 
        choices: [
            { name: "Salesperson", value: 1},
            { name: "Accounts Manager", value: 2},
            { name: "Marketing Specialist", value: 3},
            { name: "Business Analyst", value: 4},
            { name: "Software Engineer", value: 5},
            { name: "Senior Software Engineer", value: 6},
            { name: "Accountant", value: 7},
            { name: "HR Coordinator",value: 8},
            { name: "Director", value: 9}
        ]
    }, 
    {
        type: "list",
        name: "newEmpManager",
        message: "Who is the employee's assigned manager?",
        choices: [
            { name: "Dave Wallace", value: 11},
            { name: "James Hew", value: 6},
            { name: "Yukihiro Matsumoto", value: 1},
            { name: "Alfred Hitchcock", value: 4},
            { name: "Toshihiro Yokoyama", value: 7},
            { name: "null", value: "null"} // Doesn't work
        ] 
    },  
    ])
      .then((answer) => {
        const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)';
        connection.query(query, [answer.newEmpFName, answer.newEmpLName, answer.newEmpRole, answer.newEmpManager], (err, res) => {
            console.log(res);
            init();
         
        });
      });
  };

async function removeEmployee(){
    inquirer
      .prompt([  
    {
        type: "input",
        name: "rmvEmpID",
        message: "Please type the ID of the employee that is being deleted.", 
    } 
    ])
      .then((answer) => {
        const query = 'DELETE FROM employee WHERE employee_id = ? ';
        connection.query(query, [answer.rmvEmpID], (err, res) => {
            console.log("Employee with ID of "+answer.rmvEmpID+" deleted.");
            init(); 
        });
      });
};

async function updateRole(){
    inquirer
      .prompt([  
    {
        type: "input",
        name: "updateEmp",
        message: "Please type the ID of the employee to update.", 
    }, 
    {
        type: "list",
        name: "updateEmpRole",
        message: "What is the employee's role?", 
        choices: [
            { name: "Salesperson", value: 1},
            { name: "Accounts Manager", value: 2},
            { name: "Marketing Specialist", value: 3},
            { name: "Business Analyst", value: 4},
            { name: "Software Engineer", value: 5},
            { name: "Senior Software Engineer", value: 6},
            { name: "Accountant", value: 7},
            { name: "HR Coordinator",value: 8},
            { name: "Director", value: 9}
        ]
    }, 
    ])
      .then((answer) => {
        const query = 'UPDATE employee SET role_id = ? WHERE employee_id = ? ';
        connection.query(query, [answer.updateEmpRole, answer.updateEmp], (err, res) => {
            console.log("Role of Employee ID: "+ answer.updateEmp+ " updated.");
            init(); 
        });
      });
};


async function updateManager(){
    inquirer
      .prompt([  
    {
        type: "input",
        name: "updateEmp",
        message: "Please type the ID of the employee to update.", 
    }, 
    {
        type: "rawlist",
        name: "updateEmpManager",
        message: "Who will manager the nominated employee?", 
        choices: [
            { name: "Dave Wallace", value: 11},
            { name: "James Hew", value: 6},
            { name: "Yukihiro Matsumoto", value: 1},
            { name: "Alfred Hitchcock", value: 4},
            { name: "Toshihiro Yokoyama", value: 7},
            { name: "null", value: "null"} // Doesn't work
        ] 
    } 
    ])
      .then((answer) => {
        const query = 'UPDATE employee SET manager_id = ? WHERE employee_id = ? ';
        connection.query(query, [answer.updateEmpManager, answer.updateEmp], (err, res) => {
            console.log("Manager of Employee ID: "+ answer.updateEmp+ " updated.");
            init(); 
        });
      });
};

async function searchRoles () {
    connection.query(allRolesQuery, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};




