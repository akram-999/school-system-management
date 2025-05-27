const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/classAttendance.controller');
const { authenticate, authorize } = require('../middlewares/auth');

// CREATE
router.post('/', authenticate, authorize(['TEACHER']), attendanceController.createAttendance);

// READ
router.get('/', authenticate, authorize(['TEACHER']), attendanceController.getAttendanceByClass);

// UPDATE
router.put('/', authenticate, authorize(['TEACHER']), attendanceController.updateAttendance);

// DELETE
router.delete('/', authenticate, authorize(['TEACHER']), attendanceController.deleteAttendance);

module.exports = router;
