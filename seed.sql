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
