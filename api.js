// Axios API client with JWT support
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
});

// Attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On 401, clear session and redirect to login
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    }
    return Promise.reject(err);
  }
);

// Auth
export const login = (email, password) =>
  API.post('/auth/login', { email, password });

// Employees
export const getEmployees = (search = '') =>
  API.get('/employees', { params: search ? { search } : {} });
export const addEmployee = (data) => API.post('/employees', data);
export const updateEmployee = (id, data) => API.put(`/employees/${id}`, data);
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);

export default API;
