const express = require("express");
const router = express.Router();

const {
  createActivity,
  getAllActivities,
  assignStudentToActivity,
  removeStudentFromActivity,
  deleteActivity,
} = require("../controllers/activity.controller");

const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.use(authenticate);

// Admin & School Admin can create/delete/assign
router.post("/", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), createActivity);
router.delete("/:id", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), deleteActivity);

router.post("/assign-student", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), assignStudentToActivity);
router.post("/remove-student", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), removeStudentFromActivity);

// All authenticated users can view
router.get("/", authorizeRoles("ADMIN", "SCHOOL_ADMIN", "TEACHER", "GUARD", "PARENT", "STUDENT"), getAllActivities);

module.exports = router;
