const scheduleRouter = require("express").Router();
const { createSchedule, getSchedules, updateSchedule, deleteSchedule } = require("../controllers/scheduleController");
const { authenticate, authorizeRoles } = require("../middlewares/auth.middleware");

scheduleRouter.use(authenticate);
scheduleRouter.post("/", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), createSchedule);
scheduleRouter.get("/", authorizeRoles("ADMIN", "SCHOOL_ADMIN", "TEACHER", "GUARD", "STUDENT", "PARENT"), getSchedules);
scheduleRouter.put("/:id", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), updateSchedule);
scheduleRouter.delete("/:id", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), deleteSchedule);

module.exports = scheduleRouter;

