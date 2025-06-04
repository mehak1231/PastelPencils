const express = require("express");
const router = express.Router();
const designationController = require("../controllers/designationController");

router.post("/add", designationController.createDesignation);
router.get("/get", designationController.getAllDesignations);
router.get("/get/:id", designationController.getDesignationById);
router.put("/update/:id", designationController.updateDesignation);
router.delete("/delete/:id", designationController.deleteDesignation);

module.exports = router;