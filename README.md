# Employee Management System

Full-stack EMS built with **React (Vite)**, **Node.js + Express**, and **PostgreSQL**, secured with **JWT authentication**.

## Features
- JWT-based login (admin@gmail.com / admin123)
- Protected `/employees` REST API (Bearer token required)
- Dashboard with total count, search, add/edit/delete
- Auto-logout on expired/invalid token

---

## Folder Structure
```
employee-management-system/
├── frontend/        # React + Vite + Axios
├── backend/         # Express + PostgreSQL + JWT
│   ├── config/
│   ├── controllers/   (auth + employee)
│   ├── middleware/    (JWT auth)
│   └── routes/        (auth + employee)
├── database/        # SQL script
└── README.md
```

---

## 1. Database Setup

```bash
psql -U postgres -f database/employee.sql
```

## 2. Backend Setup

```bash
cd backend
npm install
```

Edit `backend/.env` (set DB password and a long random JWT_SECRET):
```
PORT=5000
DB_USER=postgres
DB_PASSWORD=yourpassword(postgres123)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=employee_management
JWT_SECRET=change_this_to_a_long_random_string
JWT_EXPIRES_IN=1d
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=admin123
```

Start the server:
```bash
npm start
```

### API Endpoints

| Method | URL              | Auth     | Description         |
|--------|------------------|----------|---------------------|
| POST   | /auth/login      | Public   | Returns JWT token   |
| GET    | /employees       | Bearer   | List (?search=)     |
| POST   | /employees       | Bearer   | Create              |
| PUT    | /employees/:id   | Bearer   | Update              |
| DELETE | /employees/:id   | Bearer   | Delete              |

All `/employees/*` routes require:
```
Authorization: Bearer <token>
```

## 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:3000

### Login
- Email: `admin@gmail.com`
- Password: `admin123`

The token is stored in `localStorage` and auto-attached to every request via Axios interceptor. On `401`, the user is signed out and redirected to login.

---

## Tech Stack
- React 18 + Vite, React Router v6, Axios
- Node.js + Express.js
- PostgreSQL (`pg`)
- `jsonwebtoken` for JWT
- Plain CSS

## License
MIT
