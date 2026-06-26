import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import EmployeeTable from '../components/EmployeeTable.jsx';
import EmployeeForm from '../components/EmployeeForm.jsx';
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from '../services/api.js';

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const loadEmployees = async (term = '') => {
    try {
      const res = await getEmployees(term);
      setEmployees(res.data);
    } catch (err) {
      console.error('Failed to load employees:', err.message);
    }
  };

  useEffect(() => { loadEmployees(); }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    loadEmployees(value);
  };

  const handleAddClick = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (emp) => {
    setEditing(emp);
    setShowForm(true);
  };

  const handleSave = async (data) => {
    try {
      if (editing) {
        await updateEmployee(editing.id, data);
      } else {
        await addEmployee(data);
      }
      setShowForm(false);
      setEditing(null);
      loadEmployees(search);
    } catch (err) {
      alert('Save failed: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this employee?')) return;
    try {
      await deleteEmployee(id);
      loadEmployees(search);
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-header">
          <div>
            <h2>Welcome, Admin 👋</h2>
            <p className="stats">Total Employees: <strong>{employees.length}</strong></p>
          </div>
        </div>

        <div className="toolbar">
          <input
            type="text"
            placeholder="Search by Employee ID or Name..."
            value={search}
            onChange={handleSearch}
          />
          <button className="btn btn-primary" onClick={handleAddClick}>+ Add Employee</button>
        </div>

        <EmployeeTable
          employees={employees}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {showForm && (
          <EmployeeForm
            initialData={editing}
            onSave={handleSave}
            onClose={() => { setShowForm(false); setEditing(null); }}
          />
        )}
      </div>
    </>
  );
}
