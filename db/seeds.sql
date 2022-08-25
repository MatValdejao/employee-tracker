INSERT INTO departments (name)
VALUES
  ('HR'),
  ('Tech'),
  ('Service');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Ronald', 80000, 1),
  ('Virginia', 70000, 1),
  ('Piers', 100000, 2),
  ('Charles', 200000, 2),
  ('Katherine', 50000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', "H", 1, NULL),
  ('Virginia', "A", 1, NULL),
  ('Piers', "B", 3, NULL),
  ('Charles', "G", 2, NULL),
  ('Katherine', "L", 1, NULL);