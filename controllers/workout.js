const Workout = require("../models/Workout");

module.exports.addWorkout = (req,res) => {
    const {id} = req.user;

	let newWorkout = new Workout({
		name : req.body.name,
		duration : req.body.duration,
        status : req.body.status,
        userId: id
	});

    console.log(id)

	newWorkout.save()
	.then(savedWorkout => res.status(201).send({workout: savedWorkout, id: id}))
	.catch(saveErr => {

		console.error("Error in saving the workout: ", saveErr)
		return res.status(500).send({ error: 'Failed to save the workout' });
	})

};

// Add getMyWorkouts, that only shows workout added of the logged in users.
module.exports.getMyWorkouts = async (req, res) => {

    try {
        const {id} = req.user;
        console.log(id)

        const workouts = await Workout.find({userId: id});

        if(workouts.length === 0){
            return res.status(404).send({message: 'No workouts found'})
        } else {
            return res.status(200).send({workouts: workouts})
        }

        console.log(workouts)
    } catch (error) {
        console.error("Error in fetching workouts: ", err);
        return res.status(500).send({ error: 'Error in fetching workouts.' });
    }
    
};


module.exports.updateWorkout = (req, res) => {

	let workoutUpdates = {
        name: req.body.name,
		duration: req.body.duration,
        status: req.body.status
    }

    return Workout.findByIdAndUpdate(req.params.id, workoutUpdates)
    .then(updatedWorkout => {

        if (!updatedWorkout) {

            return res.status(404).send({ error: 'Workout not found' });

        }

        return res.status(200).send({ 
        	message: 'Workout updated successfully', 
        	updatedWorkout: updatedWorkout
        });

    })
    .catch(err => {
		console.error("Error in updating a workout : ", err)
		return res.status(500).send({ error: 'Error in updating a workout.' });
	});
};

module.exports.deleteWorkout = (req, res) => {

    return Workout.deleteOne({ _id: req.params.id})
    .then(deletedResult => {

        if (deletedResult < 1) {

            return res.status(400).send({ error: 'No Workout deleted' });

        }

        return res.status(200).send({ 
        	message: 'Workout deleted successfully'
        });

    })
    .catch(err => {
		console.error("Error in deleting a workout : ", err)
		return res.status(500).send({ error: 'Error in deleting a workout.' });
	});
};

module.exports.completeWorkoutStatus = (req, res) => {
    Workout.findByIdAndUpdate(req.params.id, { status: 'completed' }, { new: true })
    .then(updatedWorkout => {
        if (!updatedWorkout) {
            return res.status(404).send({ error: 'Workout not found' });
        }
        return res.status(200).send({
            message: 'Workout status updated to completed',
            updatedWorkout: updatedWorkout
        });
    })
    .catch(err => {
        console.error('Error in update workout status: ', err);
        return res.status(500).send({ error: 'Error in updating workout status.'});
    });
};