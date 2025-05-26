const express = require("express");
const router = express.Router();
const { createSchool, getSchools, updateSchool, deleteSchool } = require("../controllers/school.controller");
const { authenticate, authorizeRoles } = require("../middlewares/auth.middleware");

router.use(authenticate);
router.post("/", authorizeRoles("ADMIN"), createSchool);
router.get("/", authorizeRoles("ADMIN"), getSchools);
router.put("/:id", authorizeRoles("ADMIN"), updateSchool);
router.delete("/:id", authorizeRoles("ADMIN"), deleteSchool);

module.exports = router;
