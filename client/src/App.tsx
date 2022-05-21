import { useState, useEffect } from "react";
import { Form, MovieCard } from "./components";
import { fetchMovies } from "./api";
import "./styles/main.css";

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
	const [error, setError] = useState<boolean>(false);
	const [notification, setNotification] = useState<string>("");

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
			setError(false);
			setLoading(true);
			const data: FilmType[] = await fetchMovies();
			setMovies(data);
			setLoading(false);
		} catch (error) {
			setError(true);
		}
	};

	useEffect(() => {
		getMovies();
	}, []);

	return (
		<div className="app">
			{notification && <div className="app__notification">{notification}</div>}
			<h1 className="app__title">Your Favourite Movies</h1>
			<div className="app__container">
				<Form
					setNotification={setNotification}
					getMovies={getMovies}
					formData={formData}
					setFormData={setFormData}
					currentId={currentId}
					setCurrentId={setCurrentId}
				/>
				{movies &&
					movies.map((movie) => (
						<MovieCard
							setNotification={setNotification}
							getMovies={getMovies}
							movieData={movie}
							setCurrentId={setCurrentId}
							setFormData={setFormData}
							key={movie._id}
						/>
					))}

				{loading && <div>Loading...</div>}
				{error && <div>Failed to fetch data</div>}
			</div>
		</div>
	);
}

export default App;
