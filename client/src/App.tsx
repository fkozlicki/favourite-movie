import React, { useState, useEffect } from "react";
import { Form, MovieCard, Loading, Error } from "./components";
import { fetchMovies } from "./api";

import "./App.css";

export type FilmType = {
	_id?: string;
	title: string;
	director: string;
	year: string;
	rate: number;
	category: string;
	image: string;
};

function App() {
	const [movies, setMovies] = useState<FilmType[]>([]);
	const [currentId, setCurrentId] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	const [formData, setFormData] = useState<FilmType>({
		title: "",
		director: "",
		year: "",
		category: "",
		rate: 0,
		image: "",
	});

	const getMovies = async () => {
		try {
			setError("");
			setLoading(true);
			const data = await fetchMovies();
			setMovies(data);
		} catch (error: any) {
			console.error(error);
			setError("Failed while fetching movies.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getMovies();
	}, []);

	return (
		<div className="app">
			<h1 className="app__title">Your Favourite Movies</h1>
			<div className="app__container">
				<Form
					movies={movies}
					setMovies={setMovies}
					formData={formData}
					setFormData={setFormData}
					currentId={currentId}
					setCurrentId={setCurrentId}
				/>
				{movies &&
					movies.map((movie) => (
						<MovieCard
							movies={movies}
							setMovies={setMovies}
							movieData={movie}
							setCurrentId={setCurrentId}
							setFormData={setFormData}
							key={movie._id}
						/>
					))}

				{loading && <Loading />}
				{error && <Error message={error} />}
			</div>
		</div>
	);
}

export default App;
