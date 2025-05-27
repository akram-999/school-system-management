const express = require("express");
const router = express.Router();

const {
  createTransportation,
  getTransportations,
  updateTransportation,
  deleteTransportation,
} = require("../controllers/transportation.controller");

const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.use(authenticate);

router.post("/", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), createTransportation);
router.get("/", authorizeRoles("ADMIN", "SCHOOL_ADMIN", "GUARD", "PARENT"), getTransportations);
router.put("/:id", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), updateTransportation);
router.delete("/:id", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), deleteTransportation);

module.exports = router;
