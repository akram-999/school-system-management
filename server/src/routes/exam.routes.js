const examRouter = require("express").Router();

const {
  createExam,
  getExams,
  updateExam,
  deleteExam,
} = require("../controllers/exam.controller");

const { authenticate, authorizeRoles } = require("../middlewares/auth.middleware");

examRouter.use(authenticate);

router.post("/", authorizeRoles("ADMIN", "SCHOOL_ADMIN", "TEACHER"), createExam);
router.get("/", authorizeRoles("ADMIN", "SCHOOL_ADMIN", "TEACHER", "GUARD", "STUDENT", "PARENT"), getExams);
router.put("/:id", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), updateExam);
router.delete("/:id", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), deleteExam);
router.get("/export/class/:classId", authenticate, examController.exportExamResultsByClass);

module.exports = examRouter;
