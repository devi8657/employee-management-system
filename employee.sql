-- Employee Management System Database Script
-- Run: psql -U postgres -f employee.sql

CREATE DATABASE employee_management;

\c employee_management;

CREATE TABLE IF NOT EXISTS employees (
  id SERIAL PRIMARY KEY,
  employee_id VARCHAR(50) UNIQUE NOT NULL,
  employee_name VARCHAR(100) NOT NULL,
  dob DATE,
  designation VARCHAR(100),
  department VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL
);

-- Sample data
INSERT INTO employees (employee_id, employee_name, dob, designation, department, email) VALUES
('EMP001', 'John Doe', '1995-04-12', 'Software Engineer', 'IT', 'john@example.com'),
('EMP002', 'Jane Smith', '1992-09-23', 'HR Manager', 'Human Resources', 'jane@example.com'),
('EMP003', 'Bob Wilson', '1990-01-15', 'Accountant', 'Finance', 'bob@example.com');
