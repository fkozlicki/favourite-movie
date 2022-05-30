import * as api from "../api";
import { moviesActions } from "../reducers/moviesSlice";
import { AppDispatch } from "../store";
import { FilmType } from "../App";

export const fetchData = () => {
	return async (dispatch: AppDispatch) => {
		try {
			const data = await api.fetchMovies();
			dispatch(moviesActions.setMovies(data));
		} catch (error) {}
	};
};

export const createMovie = (data: FilmType) => {
	return async (dispatch: AppDispatch) => {
		try {
			const res = await api.postMovie(data);
			const resData = await res.json();
			dispatch(moviesActions.addMovie(resData));
		} catch (error) {}
	};
};

export const deleteMovie = (id: string) => {
	return async (dispatch: AppDispatch) => {
		try {
			const res = await api.deleteMovie(id);
			const resData = await res.json();
			dispatch(moviesActions.removeMovie(id));
		} catch (error) {}
	};
};
