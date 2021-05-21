USE EmployeeDB;

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
("Senior Software Engineer", 90000.00, 2),
("Accountant", 60000.00, 3),
("HR Coordinator", 40000.00, 5),
("Director", 90000.00, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Yukihiro", "Matsumoto", 6, NULL),
("Zac", "Li", 6, 1),
("Art", "Sangdao", 3, 4),
("Alfred", "Zhang", 4, NULL),
("Jian", "Yang", 5, 2),
("James", "Hew", 7, NULL),
("Toshihiro", "Yokoyama", 2, NULL),
("Andre", "Richardson", 1, 7),
("Steve", "Broderick", 1, 7),
("Toby", "Flenderson", 8, 11),
("Dave", "Wallace", 9, NULL);