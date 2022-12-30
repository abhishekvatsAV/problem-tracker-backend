const express = require("express");
const router = express.Router();
const problemsController = require("../controllers/problemsController");

// /problems + ...
router.post("/create", problemsController.problemCreate);
router.get("/getAllProblems", problemsController.getAllProblems);
router.post("/deleteProblem", problemsController.deleteProblem);
router.delete("/deleteExists", problemsController.deleteAlreadyExist);
router.get("/findbydate", problemsController.findByDate);
router.get("/withHelp", problemsController.helpProblems);
router.get("/withoutHelp", problemsController.notHelpProblems);
router.get("/yeardata", problemsController.getYearData);
router.get("/easy", problemsController.easyProblems);
router.get("/medium", problemsController.mediumProblems);
router.get("/hard", problemsController.hardProblems);
router.get("/month", problemsController.monthProblems);
router.get("/week", problemsController.weekProblems);

module.exports = router;
