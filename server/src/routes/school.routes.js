const express = require("express");
const router = express.Router();
const { createSchool, getSchools, updateSchool, deleteSchool } = require("../controllers/schoolController");
const { authenticate, authorizeRoles } = require("../middleware/auth");

router.use(authenticate);
router.post("/", authorizeRoles("ADMIN"), createSchool);
router.get("/", authorizeRoles("ADMIN"), getSchools);
router.put("/:id", authorizeRoles("ADMIN"), updateSchool);
router.delete("/:id", authorizeRoles("ADMIN"), deleteSchool);

module.exports = router;
