import { useEffect } from "react";
import { Form, MoviesContainer } from "./components";
import { fetchData } from "./actions/movies";
import { useAppDispatch } from "./store";

import "./styles/main.css";

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchData());
	}, []);

	return (
		<div className="app">
			<h1 className="app__title">Your Favourite Movies</h1>
			<div className="app__container">
				<Form />
				<MoviesContainer />
			</div>
		</div>
	);
}

export default App;
