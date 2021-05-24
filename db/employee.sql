DROP DATABASE IF EXISTS EmployeeDB;
CREATE DATABASE EmployeeDB;

USE EmployeeDB;

CREATE TABLE department (
  department_id INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  PRIMARY KEY (department_id)
);

CREATE TABLE `role` (
  role_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (role_id),
  FOREIGN KEY (department_id) REFERENCES department(department_id)
);

CREATE TABLE employee (
  employee_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (employee_id),
  FOREIGN KEY (role_id) REFERENCES `role`(role_id)
);

INSERT INTO department (name)
VALUES ("Sales"), 
("IT"), 
("Finance"), 
("Marketing"), 
("Human Resources"), 
("Executive");

INSERT INTO `role` (title, salary, department_id)
VALUES ("Salesperson", 50000.00, 1),
("Accounts Manager", 65000.00, 1),
("Marketing Specialist", 60000.00, 4),
("Business Analyst", 60000.00, 4),
("Software Engineer", 80000.00, 2),
("Senior Software Engineer", 85000.00, 2),
("Accountant", 60000.00, 3),
("HR Coordinator", 40000.00, 5),
("Director", 90000.00, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Yukihiro", "Matsumoto", 6, NULL),
("Zac", "Li", 6, 1),
("Bill", "Jenkins", 3, 4),
("Alfred", "Hitchcock", 4, NULL),
("Jian", "Yang", 5, 2),
("James", "Hew", 7, NULL),
("Toshihiro", "Yokoyama", 2, NULL),
("Andre", "Richardson", 1, 7),
("Steve", "Broderick", 1, 7),
("Toby", "Flenderson", 8, 11),
("Dave", "Wallace", 9, NULL);

ALTER TABLE employee
ADD FOREIGN KEY (manager_id) REFERENCES employee(employee_id);


-- USE EmployeeDB;

-- SELECT first_name, last_name, title, `name` AS department, salary, manager_id
-- FROM employee e, `role` r, department d
-- WHERE e.role_id = r.role_id
-- AND d.department_id = r.department_id
-- ORDER BY employee_id;

-- -- MANAGER ONLY JOIN REFERENCE
-- USE EmployeeDB;

-- SELECT e.employee_id, e.first_name, e.last_name, title, `name` AS department, salary, CONCAT(m.first_name," ", m.last_name) AS Manager
-- FROM employee e, `role` r, department d, employee m
-- WHERE e.role_id = r.role_id
-- AND d.department_id = r.department_id
-- AND e.manager_id = m.employee_id
-- ORDER BY employee_id;

-- -- ALL EMPLOYEES AND MANAGER JOIN REFERENCE

-- SELECT e.employee_id, e.first_name, e.last_name, title, `name` AS department, salary, CONCAT(m.first_name," ", m.last_name) AS manager
-- FROM `role` r, department d,  employee e
-- LEFT OUTER JOIN employee m
-- ON e.manager_id = m.employee_id
-- WHERE e.role_id = r.role_id
-- AND d.department_id = r.department_id
-- ORDER BY employee_id;
