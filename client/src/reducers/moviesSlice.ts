import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface IMovie {
	_id?: string;
	title: string;
	director: string;
	year: string;
	rate: number;
	category: string;
	image: string;
}

const initialState = {
	moviesList: [] as IMovie[],
};

export const moviesSlice = createSlice({
	name: "movies",
	initialState,
	reducers: {
		setMovies(state, action: PayloadAction<IMovie[]>) {
			state.moviesList = action.payload;
		},
		addMovie(state, action: PayloadAction<IMovie>) {
			state.moviesList.push(action.payload);
		},
		removeMovie(state, action: PayloadAction<string>) {
			const id = action.payload;
			const foundMovie = state.moviesList.find((movie) => movie._id === id);

			if (foundMovie) {
				state.moviesList = state.moviesList.filter((movie) => movie._id !== id);
			}
		},
		editMovie(state, action: PayloadAction<IMovie>) {
			const id = action.payload._id;
			state.moviesList = state.moviesList.map((movie) =>
				movie._id === id ? action.payload : movie
			);
		},
	},
});

export const moviesActions = moviesSlice.actions;
export default moviesSlice;
