import { useRef, useState } from "react";
import { AiOutlineCheck, AiOutlineClear } from "react-icons/ai";
import { FilmType } from "../../App";
import { postMovie, editMovie } from "../../api";
import { Rating } from "react-simple-star-rating";
import { InputBox } from "..";
import "./Form.css";

type FormPropsType = {
	formData: FilmType;
	setFormData: React.Dispatch<React.SetStateAction<FilmType>>;
	movies: FilmType[];
	setMovies: React.Dispatch<React.SetStateAction<FilmType[]>>;
	currentId: string;
	setCurrentId: React.Dispatch<React.SetStateAction<string>>;
};

const Form: React.FC<FormPropsType> = ({
	formData,
	setFormData,
	currentId,
	setCurrentId,
	setMovies,
	movies,
}) => {
	const fileRef = useRef<HTMLInputElement>(null);
	const [inputError, setInputError] = useState<string>("");

	// getBase64 from image file
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

	// get image blob from input
	const getFilmImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files?.length) {
			setFormData({ ...formData, image: "" });
		} else {
			const file: Blob = e.target.files[0];

			try {
				const baseURL = await getBase64(file);
				setFormData({ ...formData, image: baseURL });
			} catch (error) {
				console.error(error);
			}
		}
	};

	// clear form data
	const clearData = () => {
		setFormData({
			title: "",
			director: "",
			year: "",
			category: "",
			rate: 0,
			image: "",
		});
		fileRef.current!.value = "";
		setInputError("");
	};

	const handleMovieSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { title, director, year, rate, category } = formData;

		if (!title || !category || !director || !rate || !year) {
			setInputError("All fields are required");
			return;
		}

		if (currentId) {
			setMovies(
				movies.map((movie) => (movie._id === currentId ? formData : movie))
			);
			setCurrentId("");
			// dont need res data here, we have movie id from movie component
			await editMovie(currentId, formData);
		} else {
			const postedMovie = await postMovie(formData);
			setMovies([...movies, postedMovie]);
		}
		setInputError("");
		// clearing form data
		clearData();
	};

	return (
		<form className="form" onSubmit={handleMovieSubmit}>
			<h2 className="form__title">{currentId ? "Edit" : "Add"} Movie</h2>
			{inputError && <p className="form__error">{inputError}</p>}
			<InputBox
				title="title"
				type="text"
				inputValue={formData.title}
				onChange={(e) =>
					setFormData({
						...formData,
						title: (e.target as HTMLInputElement).value,
					})
				}
			/>
			<InputBox
				title="director"
				type="text"
				inputValue={formData.director}
				onChange={(e) =>
					setFormData({
						...formData,
						director: (e.target as HTMLInputElement).value,
					})
				}
			/>
			<InputBox
				title="category"
				type="text"
				inputValue={formData.category}
				onChange={(e) =>
					setFormData({
						...formData,
						category: (e.target as HTMLInputElement).value,
					})
				}
			/>
			<InputBox
				title="year"
				type="number"
				inputValue={formData.year}
				onChange={(e) =>
					setFormData({
						...formData,
						year: (e.target as HTMLInputElement).value,
					})
				}
			/>
			<InputBox title="rate">
				<Rating
					size={25}
					ratingValue={formData.rate}
					onClick={(rate) => setFormData({ ...formData, rate })}
				/>
			</InputBox>
			{/* FILE INPUT */}
			<div className="form__file-input">
				<input
					aria-label="choose movie picture"
					type="file"
					accept="image/*"
					onChange={getFilmImage}
					ref={fileRef}
				/>
			</div>
			{/* BUTTONS */}
			<div className="form__buttons">
				<button aria-label="submit" type="submit">
					<AiOutlineCheck />
				</button>
				<button
					type="button"
					aria-label="clear form data"
					onClick={() => {
						clearData();
						setCurrentId("");
					}}
				>
					<AiOutlineClear />
				</button>
			</div>
		</form>
	);
};

export default Form;
