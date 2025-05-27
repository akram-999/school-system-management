const adminRouter = require("express").Router();

const { createAdmin, getAdmins } = require("../controllers/admin.controller");
const { authenticate, authorizeRoles } = require("../middlewares/auth.middleware");

adminRouter.use(authenticate);
adminRouter.post("/", authorizeRoles("ADMIN"), createAdmin);
adminRouter.get("/", authorizeRoles("ADMIN"), getAdmins);

module.exports = adminRouter;