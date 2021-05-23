const initQuestion = [{
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
}];

const addEmployeeQuestion =[{
  name: "addEmpFName",
  type: "input",
  message: "Please enter employee first name."
},  
{
  name: "addEmpLName",
  type: "input",
  message: "Please enter employee last name."
},
{
  name: 'addEmpRole',
  type: 'list',
  message: 'What is the employee role?',
  choices: [
    {name:'Salesperson', value: 1},
    {name:'Accounts Manager', value: 2},
    {name:'Marketing Specialist', value: 3},
    {name:'Business Analyst', value: 4},
    {name:'Software Engineer', value: 5},
    {name:'Senior Software Engineer', value: 6},
    {name:'Accountant', value: 7},
    {name:'HR Coordinator', value: 8},
    {name:'Director', value: 9}
  ],
},
{
  name: 'addEmpManager',
  type: 'list',
  message: 'Who\'s this employee\'s assigned manager? ',
  choices: [
      {name:'Dave Wallace', value: 11},
      {name:'James Hew', value: 6},
      {name:'Yukihiro Matsumoto', value: 1},
      {name:'Alfred Hitchcock', value: 4},
      {name:'Toshihiro Yokoyama', value: 7}
  ],
}];

// INSERT INTO employee (first_name, last_name, role_id, manager_id VALUES ?)

module.export = {
    initQuestion,
    addEmployeeQuestion
}