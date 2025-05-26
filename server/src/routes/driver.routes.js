const driverRouter = require("express").Router();
const { createDriver, getDrivers, updateDriver, deleteDriver } = require("../controllers/driverController");
const { authenticate, authorizeRoles } = require("../middlewares/auth.middleware");

driverRouter.use(authenticate);
driverRouter.post("/", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), createDriver);
driverRouter.get("/", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), getDrivers);
driverRouter.put("/:id", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), updateDriver);
driverRouter.delete("/:id", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), deleteDriver);

module.exports = driverRouter;
