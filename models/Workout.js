const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Name is Required']
    },
    duration: {
        type: Number,
        required: [true, 'Duration is Required']
    },
    status: {
        type: String,
        default: 'Pending'
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Workout', workoutSchema);