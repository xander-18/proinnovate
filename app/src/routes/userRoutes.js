const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { requireAuth, getUser } = require("../middleware/clerkAuth");

// Rutas públicas (no requieren auth)
router.get("/all", userController.getUsers);

// Rutas protegidas (requieren auth de Clerk)
router.get("/me", requireAuth, getUser, userController.getMyProfile);
router.post("/sync", requireAuth, getUser, userController.syncUser);

console.log("Rutas de usuarios configuradas");

module.exports = router;
