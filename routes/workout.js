const express = require("express");
const workoutController = require("../controllers/workout");

const {verify} = require("../auth");

const router = express.Router();

router.post("/", verify, workoutController.addWorkout);
router.get("/", verify, workoutController.getMyWorkouts);
router.put("/:id", verify, workoutController.updateWorkout);
router.delete("/:id", verify, workoutController.deleteWorkout);
router.put("/:id/complete", verify, workoutController.completeWorkoutStatus);

module.exports = router;