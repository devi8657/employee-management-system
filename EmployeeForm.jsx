import { useState, useEffect } from 'react';

// Form used for both Add and Edit
export default function EmployeeForm({ initialData, onSave, onClose }) {
  const [form, setForm] = useState({
    employee_id: '',
    employee_name: '',
    dob: '',
    designation: '',
    department: '',
    email: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        employee_id: initialData.employee_id || '',
        employee_name: initialData.employee_name || '',
        dob: initialData.dob ? initialData.dob.substring(0, 10) : '',
        designation: initialData.designation || '',
        department: initialData.department || '',
        email: initialData.email || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>{initialData ? 'Edit Employee' : 'Add Employee'}</h3>
        <form onSubmit={handleSubmit}>
          <label>Employee ID</label>
          <input name="employee_id" value={form.employee_id} onChange={handleChange} required />

          <label>Employee Name</label>
          <input name="employee_name" value={form.employee_name} onChange={handleChange} required />

          <label>Date of Birth</label>
          <input type="date" name="dob" value={form.dob} onChange={handleChange} />

          <label>Designation</label>
          <input name="designation" value={form.designation} onChange={handleChange} />

          <label>Department</label>
          <input name="department" value={form.department} onChange={handleChange} />

          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />

          <div className="modal-actions">
            <button type="button" className="btn btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
