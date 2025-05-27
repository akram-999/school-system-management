const express = require("express");
const router = express.Router();

const {
  createHomework,
  getHomework,
  updateHomework,
  deleteHomework,
} = require("../controllers/homework.controller");

const {
  markHomeworkCompletion,
  getHomeworkCompletions,
} = require("../controllers/homeworkCompletion.controller");

const { authenticate, authorizeRoles } = require("../middlewares/auth.middleware");


router.use(authenticate);

router.post("/", authorizeRoles("TEACHER", "ADMIN", "SCHOOL_ADMIN"), createHomework);
router.get("/", authorizeRoles("TEACHER", "STUDENT", "PARENT", "GUARD", "ADMIN", "SCHOOL_ADMIN"), getHomework);
router.put("/:id", authorizeRoles("TEACHER", "ADMIN", "SCHOOL_ADMIN"), updateHomework);
router.delete("/:id", authorizeRoles("TEACHER", "ADMIN", "SCHOOL_ADMIN"), deleteHomework);

router.post("/complete", authorizeRoles("STUDENT"), markHomeworkCompletion);
router.get("/completions", authorizeRoles("TEACHER", "PARENT", "GUARD", "ADMIN", "SCHOOL_ADMIN"), getHomeworkCompletions);

module.exports = router;
