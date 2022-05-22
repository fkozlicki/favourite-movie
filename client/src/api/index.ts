import { FilmType } from "../App";

const url: string = import.meta.env.VITE_MOVIES_ENDPOINT;

export const fetchMovies = async () => {
	const res = await fetch(url);
	const data = await res.json();
	return data;
};

export const postMovie = async (movie: FilmType) => {
	return await fetch(url, {
		method: "POST",
		body: JSON.stringify(movie),
		headers: { "Content-Type": "application/json" },
	});
};

export const deleteMovie = async (id: string) => {
	return await fetch(`${url}/${id}`, {
		method: "DELETE",
	});
};

export const editMovie = async (id: string, movie: FilmType) => {
	return await fetch(`${url}/${id}`, {
		method: "PATCH",
		body: JSON.stringify(movie),
		headers: {
			"Content-Type": "application/json",
		},
	});
};
