const guardRouter = require("express").Router();
const { createGuard, getGuards, updateGuard, deleteGuard } = require("../controllers/guard.controller");

const { authenticate, authorizeRoles } = require("../middlewares/auth.middleware");

guardRouter.use(authenticate);
guardRouter.post("/", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), createGuard);
guardRouter.get("/", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), getGuards);
guardRouter.put("/:id", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), updateGuard);
guardRouter.delete("/:id", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), deleteGuard);

module.exports = guardRouter;

