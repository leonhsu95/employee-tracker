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
  FOREIGN KEY (role_id) REFERENCES role(role_id)
);

USE EmployeeDB;

INSERT INTO department (name)
VALUES ("Sales"), ("IT"), ("Finance"), ("Marketing"), ("HR");

INSERT INTO `role` (title, salary, department_id)
VALUES ("Sales Rep", 50000.00, 1),
("Accounts Manager", 65000.00, 1),
("Marketing Specialist", 60000.00, 4),
("Business Analyst", 60000.00, 4),
("Software Engineer", 80000.00, 2),
("Senior Software Engineer", 90000.00, 2),
("Accountant", 60000.00, 3),
("HR Rep", 40000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Satoshi", "Nakamoto", 6, 2),
("Zac", "Li", 6, NULL),
("Art", "Sangdao", 3, NULL),
("Alfred", "Zhang", 4, NULL),
("Jian", "Yang", 5, NULL),
("James", "Hew", 7, 3),
("Reggie", "Fils-Aimé", 2, 1),
("Leon", "Hsu", 5, NULL),
("Steve", "Broderick", 4, 4),
("Toby", "Flenderson", 8, 5),
("Jim", "Parsons", 1, NULL);
