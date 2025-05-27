const express = require("express");
const router = express.Router();

const {
  assignStudentToTransportation,
  removeStudentFromTransportation,
  assignAccompaniment,
  removeAccompaniment,
} = require("../controllers/transportationAssign.controller");

const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.use(authenticate);

router.post("/assign-student", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), assignStudentToTransportation);
router.post("/remove-student", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), removeStudentFromTransportation);

router.post("/assign-accompaniment", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), assignAccompaniment);
router.post("/remove-accompaniment", authorizeRoles("ADMIN", "SCHOOL_ADMIN"), removeAccompaniment);

module.exports = router;
