const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
	tournament: {
		type: String,
		required: true
	},
	discription:{
        type: String,
        required: true
    }
});

// Create the model based on the above schema
const tournament = mongoose.model('tournament', tournamentSchema);

module.exports = tournament;