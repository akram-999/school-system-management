const express = require("express");
const router = express.Router();

const {
  createProgress,
  getAllProgress,
  updateProgress,
  deleteProgress,
} = require("../controllers/textbookProgress.controller");

const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.use(authenticate);

router.post("/", authorizeRoles("TEACHER", "ADMIN", "SCHOOL_ADMIN"), createProgress);
router.get("/", authorizeRoles("TEACHER", "GUARD", "ADMIN", "SCHOOL_ADMIN"), getAllProgress);
router.put("/:id", authorizeRoles("TEACHER", "ADMIN", "SCHOOL_ADMIN"), updateProgress);
router.delete("/:id", authorizeRoles("TEACHER", "ADMIN", "SCHOOL_ADMIN"), deleteProgress);

module.exports = router;
