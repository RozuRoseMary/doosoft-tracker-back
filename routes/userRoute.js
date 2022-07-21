const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", userController.getUser);
router.patch("/", userController.updateProfile);

module.exports = router;
