const express = require("express");
const router = express.Router();
const permissionsController = require("../controllers/permissionsController");

// Create a new permission
router.post("/", permissionsController.createPermission);
router.get("/", permissionsController.getAllPermissions);

//Get a specific permission by ID
router.get("/:id", permissionsController.getPermissionById);
router.put("/:id", permissionsController.updatePermission);

// To delete a specific permission by ID
router.delete("/:id", permissionsController.deletePermission);

module.exports = router;
