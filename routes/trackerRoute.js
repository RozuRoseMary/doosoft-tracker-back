const express = require("express");

const trackerController = require(".././controllers/trackerController");

const router = express.Router();

router.get("/getAll", trackerController.getAllTracker);
router.get("/:id", trackerController.getTrackerById);
router.post("/", trackerController.createTracker);
router.patch("/:id", trackerController.updateTracker);
router.delete("/deleteIncome/:id", trackerController.deleteIncome);
router.delete("/deleteExpense/:id", trackerController.deleteExpense);

module.exports = router;
