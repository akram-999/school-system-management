const schoolAdminRouter = require("express").Router();
const { createSchoolAdmin, getSchoolAdmins, deleteSchoolAdmin } = require("../controllers/schoolAdmin.controller");
const { authenticate, authorizeRoles} = require('../middlewares/auth.middleware');

schoolAdminRouter.use(authenticate);
schoolAdminRouter.post("/", authorizeRoles("ADMIN"), createSchoolAdmin);
schoolAdminRouter.get("/", authorizeRoles("ADMIN"), getSchoolAdmins);
schoolAdminRouter.delete("/:id", authorizeRoles("ADMIN"), deleteSchoolAdmin);

module.exports = schoolAdminRouter;
