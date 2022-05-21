import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
	title: String,
	director: String,
	year: String,
	rate: Number,
	category: String,
	image: String,
});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
