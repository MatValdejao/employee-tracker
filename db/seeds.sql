INSERT INTO departments (name)
VALUES
  ('HR'),
  ('Tech'),
  ('Research'),
  ('Clinical Trials');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Research Assistant', 80000, 3),
  ('HR Manager', 90000, 1),
  ('HR Rep', 60000, 1),
  ('Software Engineer', 200000, 2),
  ('Lead Software Engineer', 250000, 2),
  ('Clinal Lead', 100000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', "Hatch", 1, NULL),
  ('Virginia', "Alber", 1, NULL),
  ('Piers', "Cray", 2, NULL),
  ('Charles', "Darwin", 3, 3),
  ('Katherine', "Lit", 5, NULL),
  ('Kate', "Lour", 4, 5);