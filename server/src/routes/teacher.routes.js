const teacherRouter = require("express").Router();
const { createTeacher, getTeachers, updateTeacher, deleteTeacher } = require("../controllers/teacher.controller");
const { authenticate, authorizeRoles } = require("../middlewares/auth.middleware");

teacherRouter.use(authenticate);
teacherRouter.post("/", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), createTeacher);
teacherRouter.get("/", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), getTeachers);
teacherRouter.put("/:id", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), updateTeacher);
teacherRouter.delete("/:id", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), deleteTeacher);

module.exports = teacherRouter;

