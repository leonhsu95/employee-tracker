const allEmpQuery = 'SELECT e.employee_id AS `ID`, e.first_name AS `First Name`, e.last_name AS `Last Name`, title AS Position, `name` AS Department, salary AS Salary, CONCAT(m.first_name," ", m.last_name) AS Manager FROM `role` r, department d,  employee e LEFT OUTER JOIN employee m ON e.manager_id = m.employee_id WHERE e.role_id = r.role_id AND d.department_id = r.department_id ORDER BY e.employee_id';

const empDepartmentQuery = 'SELECT employee_id AS `ID`, first_name AS `First Name`, last_name AS `Last Name`, title AS Position, `name` AS Department, salary AS Salary FROM employee e, `role` r, department d WHERE e.role_id = r.role_id AND d.department_id = r.department_id ORDER BY d.name';

const empManagerQuery = 'SELECT employee_id AS `ID`, first_name AS `First Name`, last_name AS `Last Name`, title AS Position, `name` AS Department, salary AS Salary FROM employee e, `role` r, department d WHERE e.role_id = r.role_id AND d.department_id = r.department_id AND manager_id IS NULL ORDER BY d.name';

const addEmpQuery = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)';

const rmvEmpQuery = 'DELETE FROM employee WHERE employee_id = ?';

const allRolesQuery = 'SELECT r.role_id AS ID, r.title AS Title, r.salary AS Salary, d.name AS Department FROM role r, department d WHERE r.department_id = d.department_id';

const addRoleQuery = 'INSERT INTO role (title, salary, department_id) VALUES (?,?,?)';

const rmvRoleQuery = 'DELETE FROM role WHERE role_id = ?';

const updateEmpRole = 'UPDATE employee SET role_id = ? WHERE employee_id = ?';

const updateEmpManager = 'UPDATE employee SET manager_id = ? WHERE employee_id = ?'; 

const allDepartmentsQuery = 'SELECT department_id AS ID, name AS Department FROM department';

const addDepartmentQuery = 'INSERT INTO department (name) VALUES (?)';

const rmvDepartmentQuery = 'DELETE FROM department WHERE department_id = ?';

const budgetQuery = 'SELECT d.`name` AS Department, SUM(salary) AS `Total Budget` FROM department d, `role` r WHERE d.department_id = r.department_id GROUP BY d.`name` ORDER BY d.`name`';


module.exports = {allEmpQuery, empDepartmentQuery, empManagerQuery, addEmpQuery, rmvEmpQuery, updateEmpRole, updateEmpManager, allDepartmentsQuery, allRolesQuery, addRoleQuery, rmvRoleQuery, addDepartmentQuery, rmvDepartmentQuery, budgetQuery};

