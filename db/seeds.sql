INSERT INTO roles (title, salary, department_id)
VALUES
  ('Ronald', 80000, NULL),
  ('Virginia', 70000, NULL),
  ('Piers', 100000, NULL),
  ('Charles', 200000, NULL),
  ('Katherine', 50000, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', "H", NULL, NULL),
  ('Virginia', "A", NULL, NULL),
  ('Piers', "B", NULL, NULL),
  ('Charles', "G", NULL, NULL),
  ('Katherine', "L", NULL, NULL);