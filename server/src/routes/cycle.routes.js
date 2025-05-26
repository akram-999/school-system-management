const cycleRouter = require("express").Router();
const { createCycle, getCycles, updateCycle, deleteCycle } = require("../controllers/cycleController");
const { authenticate, authorizeRoles } = require("../middlewares/auth.middleware");

cycleRouter.use(authenticate);
cycleRouter.post("/", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), createCycle);
cycleRouter.get("/", authorizeRoles("ADMIN", "SCHOOL_ADMIN", "TEACHER", "GUARD"), getCycles);
cycleRouter.put("/:id", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), updateCycle);
cycleRouter.delete("/:id", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), deleteCycle);

module.exports = cycleRouter;
