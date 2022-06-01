import React from "react";
import { MovieCard } from ".";
import { useAppSelector } from "../store";
import { ToastContainer, toast } from "react-toastify";

const MoviesContainer = () => {
	const movies = useAppSelector((state) => state.movies.moviesList);

	return (
		<div className="movies-container">
			{movies &&
				movies.map((movie) => <MovieCard movieData={movie} key={movie._id} />)}
			<ToastContainer />
		</div>
	);
};

export default MoviesContainer;
