const parentRouter = require("express").Router();
const { createParent, getParents, updateParent, deleteParent } = require("../controllers/parentController");
const { authenticate, authorizeRoles } = require("../middlewares/auth.middleware");

parentRouter.use(authenticate);
parentRouter.post("/", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), createParent);
parentRouter.get("/", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), getParents);
parentRouter.put("/:id", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), updateParent);
parentRouter.delete("/:id", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), deleteParent);

module.exports = parentRouter;
