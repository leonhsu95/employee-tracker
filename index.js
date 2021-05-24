const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');
const logo = require('asciiart-logo');
const config = require('./package.json');
const {allEmpQuery, empDepartmentQuery, empManagerQuery, addEmpQuery, rmvEmpQuery, updateEmpRole, updateEmpManager, allDepartmentsQuery, allRolesQuery, addRoleQuery, rmvRoleQuery, addDepartmentQuery, rmvDepartmentQuery, budgetQuery} = require('./db/queries');

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

// Validation
let inputVal = (input) => {
    return (!input || input.trim() === "" || input.length < 2 ? "This field is required. Try again." : true);
};

let numberVal = (input) => {
    return (isNaN(input) ? "Invalid ID Number. Try again." : true);
};

// Get All Query
function getAllEmployees () {
    return new Promise ((resolve, reject) => {
        connection.query(allRolesQuery, (err, res) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
            console.log(res);
        });
    });
}

function init(){
    inquirer
    .prompt({
      name: 'menu',
      type: 'list',
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
        'Add Roles',
        'Remove Roles',
        'View All Departments',
        'Add Departments',
        'Remove Departments',
        'View Total Budget by Department',
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
        answer.menu === "Add Roles" ? addRole():
        answer.menu === "Remove Roles" ? removeRole():
        answer.menu === "View All Departments" ? searchDepartments():
        answer.menu === "Add Departments" ? addDepartment():
        answer.menu === "Remove Departments" ? removeDepartment():  
        answer.menu === "View Total Budget by Department" ? viewBudget():   
        connection.end()
    })
    
};

connection.connect((err) => {
    if (err) throw err;
    console.log(logo(config).render());
    init();
});

function searchEmployees() {
    connection.query(allEmpQuery, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

function searchEmployeeDepartment () {
    connection.query(empDepartmentQuery, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

function searchEmployeeManager () {
    connection.query(empManagerQuery, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

function addEmployee(){
    const roles = await getAllEmployees();
    console.log(roles);
    inquirer
      .prompt([  
    {
        type: "input",
        name: "newEmpFName",
        message: "Please enter employee First Name.", 
        validate: inputVal
    }, 
    {
        type: "input",
        name: "newEmpLName",
        message: "Please enter employee Last Name.",
        validate: inputVal 
    },
    {
        type: "list",
        name: "newEmpRole",
        message: "What is the employee's role?", 
        // choices: [
        //     { name: "Salesperson", value: 1},
        //     { name: "Accounts Manager", value: 2},
        //     { name: "Marketing Specialist", value: 3},
        //     { name: "Business Analyst", value: 4},
        //     { name: "Software Engineer", value: 5},
        //     { name: "Senior Software Engineer", value: 6},
        //     { name: "Accountant", value: 7},
        //     { name: "HR Coordinator",value: 8},
        //     { name: "Director", value: 9}
        // ]
        choices: roles.map(({ ID: value, Title: name }) => ({ value, name }))
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
            { name: "null", value: null}
        ] 
    },  
    ])
      .then((answer) => {
        connection.query(addEmpQuery, [answer.newEmpFName, answer.newEmpLName, answer.newEmpRole, answer.newEmpManager], (err, res) => {
            console.log(res);
            init();
         
        });
      });
  };

function removeEmployee(){
    inquirer
      .prompt([  
    {
        type: "input",
        name: "rmvEmpID",
        message: "Please type the ID of the employee that is being deleted.", 
        validate: numberVal
    } 
    ])
      .then((answer) => {
        connection.query(rmvEmpQuery, [answer.rmvEmpID], (err, res) => {
            console.log("Employee with ID of "+answer.rmvEmpID+" deleted.");
            init(); 
        });
      });
};

function updateRole(){
    inquirer
      .prompt([  
    {
        type: "input",
        name: "updateEmp",
        message: "Please type the ID of the employee to update.",
        validate: numberVal
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
        connection.query(updateEmpRole, [answer.updateEmpRole, answer.updateEmp], (err, res) => {
            console.log("Role of Employee ID: "+ answer.updateEmp+ " updated.");
            init(); 
        });
      });
};


function updateManager(){
    inquirer
      .prompt([  
    {
        type: "input",
        name: "updateEmp",
        message: "Please type the ID of the employee to update.", 
        validate: numberVal
    }, 
    {
        type: "list",
        name: "updateEmpManager",
        message: "Who will manager the nominated employee?", 
        choices: [
            { name: "Dave Wallace", value: 11},
            { name: "James Hew", value: 6},
            { name: "Yukihiro Matsumoto", value: 1},
            { name: "Alfred Hitchcock", value: 4},
            { name: "Toshihiro Yokoyama", value: 7},
            { name: "null", value: null}
        ] 
    } 
    ])
      .then((answer) => {
        console.log(answer.updateEmpManager);
        connection.query(updateEmpManager, [answer.updateEmpManager, answer.updateEmp], (err, res) => {
            console.log(res);
            console.log("Manager of Employee ID: "+ answer.updateEmp+ " updated.");
            init(); 
        });
      });
};

function searchRoles () {
    connection.query(allRolesQuery, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

function addRole(){
    inquirer
      .prompt([  
    {
        type: "input",
        name: "newRole",
        message: "What is the name of the new role?",
        validate: inputVal 
    }, 
    {
        type: "input",
        name: "newRoleSalary",
        message: "What is salary of this role?", 
        validate: numberVal
    },
    {
        type: "list",
        name: "newRoleDepartment",
        message: "What department is this role associated with?",
        choices: [
            { name: "Sales", value: 1},
            { name: "IT", value: 2},
            { name: "Finance", value: 3},
            { name: "Marketing", value: 4},
            { name: "Human Resources", value: 4},
            { name: "Executive", value: 6} 
        ] 
    },  
    ])
      .then((answer) => {
        connection.query(addRoleQuery, [answer.newRole, answer.newRoleSalary, answer.newRoleDepartment], (err, res) => {
            console.log("New Role "+answer.newRole+" added");
            init();
         
        });
      });
  };

function removeRole(){
    connection.query(allRolesQuery);
    inquirer
      .prompt([  
    {
        type: "input",
        name: "rmvRoleID",
        message: "Please type the ID of the role that is being deleted.", 
        validate: numberVal
    } 
    ])
      .then((answer) => {
        connection.query(rmvRoleQuery, [answer.rmvRoleID], (err, res) => {
            console.log("Role with ID of "+answer.rmvRoleID+" deleted.");
            init(); 
        });
      });
};


function searchDepartments () {
    connection.query(allDepartmentsQuery, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

function addDepartment(){
    inquirer
      .prompt([  
    {
        type: "input",
        name: "newDepartment",
        message: "What is the name of the new department?", 
        validate: inputVal
    }, 
    ])
      .then((answer) => {
        connection.query(addDepartmentQuery, [answer.newDepartment], (err, res) => {
            console.log(res);
            init();
         
        });
      });
};

function removeDepartment(){
    inquirer
      .prompt([  
    {
        type: "input",
        name: "rmvDepartmentID",
        message: "Please type the ID of the department that is being deleted.",
        validate: numberVal
    } 
    ])
      .then((answer) => {
        connection.query(rmvDepartmentQuery, [answer.rmvDepartmentID], (err, res) => {
            console.log("Department with ID of "+answer.rmvDepartmentID+" deleted.");
            init(); 
        });
      });
};

function viewBudget() {
    connection.query(budgetQuery, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};


