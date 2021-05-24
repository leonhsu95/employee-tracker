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
        connection.query(allEmpQuery, (err, res) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
            // console.log(res);
        });
    });
}

function getAllRoles () {
    return new Promise ((resolve, reject) => {
        connection.query(allRolesQuery, (err, res) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
            // console.log(res);
        });
    });
}

function getAllDepartments () {
    return new Promise ((resolve, reject) => {
        connection.query(allDepartmentsQuery, (err, res) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
            // console.log(res);
        });
    });
}

async function init(){
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
    const roles = await getAllRoles();
    const employees = await getAllEmployees();
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
        // choices: [
        //     { name: "Dave Wallace", value: 11},
        //     { name: "James Hew", value: 6},
        //     { name: "Yukihiro Matsumoto", value: 1},
        //     { name: "Alfred Hitchcock", value: 4},
        //     { name: "Toshihiro Yokoyama", value: 7},
        //     { name: "null", value: null}
        // ] 
        choices: employees.map(({ ID: value, 'Last Name': name }) => ({ value, name }))
    },  
    ])
      .then((answer) => {
        connection.query(addEmpQuery, [answer.newEmpFName, answer.newEmpLName, answer.newEmpRole, answer.newEmpManager], (err, res) => {
            console.log(res);
            init();
         
        });
      });
  };

async function removeEmployee(){
    const employees = await getAllEmployees();
    inquirer
      .prompt([  
        {
            type: "list",
            name: "rmvEmployee",
            message: "Who is the employee's assigned manager?",
            choices: employees.map(({ ID: value, 'Last Name': name }) => ({ value, name }))
        },  
    ])
      .then((answer) => {
        connection.query(rmvEmpQuery, [answer.rmvEmployee], (err, res) => {
            console.log("Employee "+answer.rmvEmployee+" deleted.");
            init(); 
        });
      });
};

async function updateRole(){
    const employees = await getAllEmployees();
    const roles = await getAllRoles();
    inquirer
    .prompt([  
    {
        type: "list",
        name: "updateEmp",
        message: "Which employee are you updating?",
        choices: employees.map(({ ID: value, 'Last Name': name }) => ({ value, name }))
    },  
    {
        type: "list",
        name: "updateEmpRole",
        message: "What is the employee's new role?", 
        choices: roles.map(({ ID: value, Title: name }) => ({ value, name }))
    }, 
    ])
      .then((answer) => {
        connection.query(updateEmpRole, [answer.updateEmpRole, answer.updateEmp], (err, res) => {
            console.log("Role of Employee ID: "+ answer.updateEmp+ " updated.");
            init(); 
        });
      });
};


async function updateManager(){
    const employees = await getAllEmployees();
    inquirer
    .prompt([  
    {
        type: "list",
        name: "updateEmp",
        message: "Which employee are you updating?",
        choices: employees.map(({ ID: value, 'Last Name': name }) => ({ value, name }))
    }, 
    {
        type: "list",
        name: "updateEmpManager",
        message: "Who is the employee's assigned manager?",
        choices: employees.map(({ ID: value, 'Last Name': name }) => ({ value, name }))
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

async function searchRoles () {
    connection.query(allRolesQuery, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

async function addRole(){
    const departments = await getAllDepartments();
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
        choices: departments.map(({ ID: value, Department: name }) => ({ value, name }))
    },  
    ])
      .then((answer) => {
        connection.query(addRoleQuery, [answer.newRole, answer.newRoleSalary, answer.newRoleDepartment], (err, res) => {
            console.log("New Role "+answer.newRole+" added");
            init();
         
        });
      });
  };

async function removeRole(){
    const roles = await getAllRoles();
    connection.query(allRolesQuery);
    inquirer
      .prompt([  
        {
            type: "list",
            name: "rmvRole",
            message: "What role do you wish to delete?", 
            choices: roles.map(({ ID: value, Title: name }) => ({ value, name }))
        },
    ])
      .then((answer) => {
        connection.query(rmvRoleQuery, [answer.rmvRole], (err, res) => {
            console.log("Role with ID of "+answer.rmvRole+" deleted.");
            init(); 
        });
      });
};


async function searchDepartments () {
    connection.query(allDepartmentsQuery, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

async function addDepartment(){
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

async function removeDepartment(){
    const departments = await getAllDepartments();
    inquirer
      .prompt([  
    {
        type: "list",
        name: "rmvDepartment",
        message: "What department do you want to remove?",
        choices: departments.map(({ ID: value, Department: name }) => ({ value, name }))
    } 
    ])
      .then((answer) => {
        connection.query(rmvDepartmentQuery, [answer.rmvDepartment], (err, res) => {
            console.log("Department "+answer.rmvDepartment+" deleted.");
            init(); 
        });
      });
};

async function viewBudget() {
    connection.query(budgetQuery, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};


