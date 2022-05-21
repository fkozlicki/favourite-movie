import mongoose from "mongoose";
import Movie from "../models/movie.js";

export const getAllMovies = async (req, res) => {
	try {
		const allMovies = await Movie.find();
		res.status(200).json(allMovies);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getSpecificMovie = async (req, res) => {};

export const addMovie = async (req, res) => {
	const movie = req.body;
	const newMovie = new Movie(movie);
	try {
		await newMovie.save();
		res.status(201).json(newMovie);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const updateMovie = async (req, res) => {
	const { id } = req.params;
	const { title, director, year, rate, category, image } = req.body;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with id: ${id}`);

	const updatedMovie = {
		title,
		director,
		year,
		rate,
		category,
		image,
		_id: id,
	};

	await Movie.findByIdAndUpdate(id, updatedMovie, { new: true });

	res.json(updatedMovie);
};

export const deleteMovie = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with id: ${id}`);

	await Movie.findByIdAndRemove(id);

	res.json({ message: "Post deleted successfully" });
};
