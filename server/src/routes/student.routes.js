const studentRouter = require("express").Router();
const { createStudent, getStudents, updateStudent, deleteStudent } = require("../controllers/studentController");

const { authenticate, authorizeRoles } = require("../middlewares/auth.middleware");

studentRouter.use(authenticate);
studentRouter.post("/", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), createStudent);
studentRouter.get("/", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), getStudents);
studentRouter.put("/:id", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), updateStudent);
studentRouter.delete("/:id", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), deleteStudent);

module.exports = studentRouter;
