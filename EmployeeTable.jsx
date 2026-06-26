export default function EmployeeTable({ employees, onEdit, onDelete }) {
  if (!employees.length) {
    return <div className="table-wrapper" style={{ padding: 20, textAlign: 'center' }}>No employees found.</div>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Designation</th>
            <th>Department</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.employee_id}</td>
              <td>{emp.employee_name}</td>
              <td>{emp.dob ? emp.dob.substring(0, 10) : '-'}</td>
              <td>{emp.designation}</td>
              <td>{emp.department}</td>
              <td>{emp.email}</td>
              <td className="actions">
                <button className="btn btn-edit" onClick={() => onEdit(emp)}>Edit</button>
                <button className="btn btn-delete" onClick={() => onDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
