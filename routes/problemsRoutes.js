const express = require("express");
const problemsController = require("../controllers/problemsController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all problems routes
router.use(requireAuth);

// /problems + ...
router.post("/create", problemsController.problemCreate);
router.get("/getAllProblems", problemsController.getAllProblems);
router.post("/deleteProblem", problemsController.deleteProblem);
router.delete("/deleteExists", problemsController.deleteAlreadyExist);
router.get("/findbydate", problemsController.findByDate);

module.exports = router;
