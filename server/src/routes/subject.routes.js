const subjectRouter = require("express").Router();
const { createSubject, getSubjects, updateSubject, deleteSubject } = require("../controllers/subjectController");
const { authenticate, authorizeRoles } = require("../middlewares/auth.middleware");

subjectRouter.use(authenticate);
subjectRouter.post("/", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), createSubject);
subjectRouter.get("/", authorizeRoles("ADMIN", "SCHOOL_ADMIN", "TEACHER", "GUARD"), getSubjects);
subjectRouter.put("/:id", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), updateSubject);
subjectRouter.delete("/:id", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), deleteSubject);

module.exports = subjectRouter;
