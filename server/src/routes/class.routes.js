const classRouter = require("express").Router();
const { createClass, getClasses, updateClass, deleteClass } = require("../controllers/classController");
const { authenticate, authorizeRoles } = require("../middlewares/auth.middleware");

classRouter.use(authenticate);
classRouter.post("/", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), createClass);
classRouter.get("/", authorizeRoles("ADMIN", "SCHOOL_ADMIN", "TEACHER", "GUARD"), getClasses);
classRouter.put("/:id", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), updateClass);
classRouter.delete("/:id", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), deleteClass);

module.exports = classRouter;
