import { useState, useRef } from "react";
import { AiOutlineCheck, AiOutlineClear } from "react-icons/ai";
import { createMovie, editMovie } from "../actions/movies";
import { useAppDispatch, useAppSelector } from "../store";
import { InputBox, RatingContainer, Rating } from ".";
import { setCurrentMovieId } from "../reducers/moviesSlice";

const Form = () => {
	const [title, setTitle] = useState<string>("");
	const [director, setDirector] = useState<string>("");
	const [year, setYear] = useState<string>("");
	const [category, setCategory] = useState<string>("");
	const [image, setImage] = useState<string>("");
	const [rate, setRate] = useState(0);
	// reference of disabled input for RatingContainer
	const disabledInput = useRef<HTMLInputElement>(null);
	// reference of file input
	const fileRef = useRef<HTMLInputElement>(null);
	// id of selected movie for editing
	const currentMovieId = useAppSelector((state) => state.movies.currentMovieId);

	const dispatch = useAppDispatch();

	const getBase64 = (file: Blob): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader: FileReader = new FileReader();
			reader.readAsDataURL(file);

			reader.onload = () => {
				const baseURL: string = reader.result as string;
				resolve(baseURL);
			};
			reader.onerror = (error) => {
				reject(error);
			};
		});
	};

	const getFilmImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files?.length) {
			setImage("");
		} else {
			const file: Blob = e.target.files[0];

			try {
				const baseURL = await getBase64(file);
				setImage(baseURL);
			} catch (error) {
				console.error(error);
			}
		}
	};

	const clearData = () => {
		// clearing states
		setTitle("");
		setDirector("");
		setYear("");
		setCategory("");
		setImage("");
		setRate(0);
		// clearing file input
		fileRef.current!.value = "";
		// clearing rating
		disabledInput.current!.checked = true;
		// turning off editting mode
		dispatch(setCurrentMovieId(""));
	};

	const handleMovieSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!title || !category || !director || !rate || !year) {
			return;
		}

		const formData = {
			title,
			category,
			director,
			rate,
			year,
			image,
		};

		// if editing mode on
		if (currentMovieId) {
			dispatch(editMovie(currentMovieId, formData));
		} else {
			dispatch(createMovie(formData));
		}

		// clearing form data
		clearData();
	};

	return (
		<form className="form" onSubmit={handleMovieSubmit}>
			<h2 className="form__title">{currentMovieId ? "Edit" : "Add"} Movie</h2>
			<InputBox
				title="Title"
				type="text"
				inputValue={title}
				onChange={setTitle}
			/>
			<InputBox
				title="Directed By"
				type="text"
				inputValue={director}
				onChange={setDirector}
			/>
			<InputBox
				title="Category"
				type="text"
				inputValue={category}
				onChange={setCategory}
			/>
			<InputBox
				title="Year"
				type="number"
				inputValue={year}
				onChange={setYear}
			/>
			<RatingContainer disabledInputRef={disabledInput}>
				<>
					<Rating name="rating-1" value={1} onClick={setRate} />
					<Rating name="rating-2" value={2} onClick={setRate} />
					<Rating name="rating-3" value={3} onClick={setRate} />
					<Rating name="rating-4" value={4} onClick={setRate} />
					<Rating name="rating-5" value={5} onClick={setRate} />
				</>
			</RatingContainer>

			<div className="form__file-input">
				<input
					aria-label="choose movie picture"
					type="file"
					onChange={getFilmImage}
					ref={fileRef}
				/>
			</div>

			<div className="form__buttons">
				<button aria-label="submit" type="submit">
					<AiOutlineCheck />
				</button>
				<button
					type="button"
					aria-label="clear form data"
					onClick={() => {
						clearData();
					}}
				>
					<AiOutlineClear />
				</button>
			</div>
		</form>
	);
};

export default Form;
