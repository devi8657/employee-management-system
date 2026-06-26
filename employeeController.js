// Employee CRUD logic
const pool = require('../config/db');

// GET all employees (supports ?search=)
exports.getEmployees = async (req, res) => {
  try {
    const { search } = req.query;
    let result;
    if (search) {
      result = await pool.query(
        `SELECT * FROM employees
         WHERE employee_id ILIKE $1 OR employee_name ILIKE $1
         ORDER BY id DESC`,
        [`%${search}%`]
      );
    } else {
      result = await pool.query('SELECT * FROM employees ORDER BY id DESC');
    }
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create
exports.createEmployee = async (req, res) => {
  try {
    const { employee_id, employee_name, dob, designation, department, email } = req.body;
    const result = await pool.query(
      `INSERT INTO employees (employee_id, employee_name, dob, designation, department, email)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [employee_id, employee_name, dob, designation, department, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT update
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { employee_id, employee_name, dob, designation, department, email } = req.body;
    const result = await pool.query(
      `UPDATE employees
       SET employee_id=$1, employee_name=$2, dob=$3, designation=$4, department=$5, email=$6
       WHERE id=$7 RETURNING *`,
      [employee_id, employee_name, dob, designation, department, email, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM employees WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
