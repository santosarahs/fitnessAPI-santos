const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const port = 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors());

// MongoDB Database
mongoose.connect("mongodb+srv://admin:admin123@wdc028-b461.ubalv.mongodb.net/FitnessTrackerAPI?retryWrites=true&w=majority&appName=WDC028-B461", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas'));

//Routes Middleware
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);

if(require.main === module){
	app.listen(process.env.PORT || port, () => {
	    console.log(`API is now online on port ${ process.env.PORT || port }`)
	});
}

module.exports = {app,mongoose};