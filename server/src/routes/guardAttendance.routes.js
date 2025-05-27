const express = require('express');
const router = express.Router();
const controller = require('../controllers/guardAttendance.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

// CRUD
router.post('/', authenticate, authorize(['GUARD']), controller.recordAttendance);
router.get('/', authenticate, authorize(['GUARD']), controller.getAttendanceByDate);
router.put('/', authenticate, authorize(['GUARD']), controller.updateAttendance);
router.delete('/:id', authenticate, authorize(['GUARD']), controller.deleteAttendance);

// Export Excel
router.get('/export/:date', authenticate, authorize(['GUARD']), controller.exportAttendance);

module.exports = router;
