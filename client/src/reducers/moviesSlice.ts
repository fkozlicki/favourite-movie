import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IMovie {
	_id?: string;
	title: string;
	director: string;
	year: string;
	rate: number;
	category: string;
	image: string;
}

type MovieStateType = {
	moviesList: IMovie[];
	currentMovieId?: string;
	isLoading: boolean;
	error: string;
	notification: string;
};

const initialState: MovieStateType = {
	moviesList: [],
	currentMovieId: "",
	error: "",
	isLoading: false,
	notification: "",
};

const { actions, reducer } = createSlice({
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
		setCurrentMovieId(state, action: PayloadAction<string | undefined>) {
			state.currentMovieId = action.payload;
		},
		setError(state, action: PayloadAction<string>) {
			state.error = action.payload;
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload;
		},
		setNotification(state, action: PayloadAction<string>) {
			state.notification = action.payload;
		},
	},
});

export const {
	setMovies,
	addMovie,
	removeMovie,
	setCurrentMovieId,
	editMovie,
	setError,
	setLoading,
	setNotification,
} = actions;
export default reducer;
