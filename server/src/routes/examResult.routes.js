const examResultRouter = require("express").Router();

const {
  createExamResult,
  getExamResults,
  updateExamResult,
  deleteExamResult,
} = require("../controllers/examResult.controller");

const { authenticate, authorizeRoles } = require("../middlewares/auth.middleware");

examResultRouter.use(authenticate);

router.post("/", authorizeRoles("ADMIN", "SCHOOL_ADMIN", "TEACHER"), createExamResult);
router.get("/", authorizeRoles("ADMIN", "SCHOOL_ADMIN", "TEACHER", "GUARD", "STUDENT", "PARENT"), getExamResults);
router.put("/:id", authorizeRoles("ADMIN", "SCHOOL_ADMIN", "TEACHER"), updateExamResult);
router.delete("/:id", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), deleteExamResult);

module.exports = examResultRouter;
