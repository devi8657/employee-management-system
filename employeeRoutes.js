// Employee routes - all protected by JWT
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/employeeController');
const auth = require('../middleware/authMiddleware');

router.use(auth); // every route below requires a valid JWT

router.get('/', ctrl.getEmployees);
router.post('/', ctrl.createEmployee);
router.put('/:id', ctrl.updateEmployee);
router.delete('/:id', ctrl.deleteEmployee);

module.exports = router;
