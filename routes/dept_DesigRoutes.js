const express = require("express");
const router = express.Router();
const deptDesigController = require("../controllers/deptDesigController");

// To create a department-designation mapping
router.post("/", deptDesigController.createDeptDesig);

// To get all department-designation mappings
router.get("/", deptDesigController.getAllDeptDesigs);

// To delete a specific department-designation mapping by ID
router.delete("/:id", deptDesigController.deleteDeptDesig);
module.exports = router;
