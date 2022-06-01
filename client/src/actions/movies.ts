import * as api from "../api";
import {
	setMovies,
	addMovie,
	removeMovie,
	editMovie as editSpecificMovie,
	setError,
	setLoading,
} from "../reducers/moviesSlice";
import { AppDispatch } from "../store";
import { IMovie } from "../reducers/moviesSlice";

export const fetchData = () => {
	return async (dispatch: AppDispatch) => {
		try {
			dispatch(setLoading(true));
			const res = await api.fetchMovies();
			dispatch(setMovies(res));
		} catch (error) {
			console.error(error);
			dispatch(setError("Couldn't load movies. Try to reload the page."));
		} finally {
			dispatch(setLoading(false));
		}
	};
};

export const createMovie = (data: IMovie) => {
	return async (dispatch: AppDispatch) => {
		try {
			const res = await api.postMovie(data);
			const resData = await res.json();
			dispatch(addMovie(resData));
		} catch (error) {}
	};
};

export const deleteMovie = (id: string) => {
	return async (dispatch: AppDispatch) => {
		try {
			const res = await api.deleteMovie(id);
			const resData = await res.json();
			dispatch(removeMovie(id));
		} catch (error) {}
	};
};

export const editMovie = (id: string, editedMovie: IMovie) => {
	return async (dispatch: AppDispatch) => {
		try {
			const res = await api.editMovie(id, editedMovie);
			const resData = await res.json();
			dispatch(editSpecificMovie(resData));
		} catch (error) {}
	};
};
