// routes/rolePermissionsRoutes.js
const express = require("express");
const router = express.Router();
const rolePermissionsController = require("../controllers/rolePermissionsController");

router.post("/", rolePermissionsController.createRolePermission);
router.get("/", rolePermissionsController.getAllRolePermissions);
router.delete("/:id", rolePermissionsController.deleteRolePermission);

module.exports = router;