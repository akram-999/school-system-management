const attendanceRouter = require("express").Router();

const {
  createAttendance,
  getAttendances,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendance.controller");

const { authenticate, authorizeRoles } = require("../middlewares/auth.middleware");

attendanceRouter.use(authenticate);

router.post("/", authorizeRoles("GUARD", "TEACHER", "SCHOOL_ADMIN"), createAttendance);
router.get("/", authorizeRoles("GUARD", "TEACHER", "SCHOOL_ADMIN"), getAttendances);
router.put("/:id", authorizeRoles("GUARD", "TEACHER", "SCHOOL_ADMIN"), updateAttendance);
router.delete("/:id", authorizeRoles("GUARD", "TEACHER", "SCHOOL_ADMIN"), deleteAttendance);

module.exports = attendanceRouter;
