import { useRef } from "react";
import { AiOutlineCheck, AiOutlineClear } from "react-icons/ai";
import { FilmType } from "../App";
import { postMovie, editMovie } from "../api";

type Props = {
	formData: FilmType;
	setFormData: React.Dispatch<React.SetStateAction<FilmType>>;
	currentId: string;
	setCurrentId: React.Dispatch<React.SetStateAction<string>>;
	getMovies: () => Promise<void>;
	setNotification: React.Dispatch<React.SetStateAction<string>>;
};

const Form: React.FC<Props> = ({
	formData,
	setFormData,
	currentId,
	setCurrentId,
	getMovies,
	setNotification,
}) => {
	const disabledInput = useRef<HTMLInputElement>(null);
	const fileRef = useRef<HTMLInputElement>(null);

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
			setFormData({ ...formData, image: "" });
		} else {
			const file: Blob = e.target.files[0];

			try {
				const baseURL = await getBase64(file);
				setFormData({ ...formData, image: baseURL });
			} catch (error) {
				console.log(error);
			}
		}
	};

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
		disabledInput.current!.checked = true;
	};

	const handleMovieSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const { title, director, year, rate, category } = formData;

		if (!title || !category || !director || !rate || !year) {
			setNotification("All fields are required");
			setTimeout(() => setNotification(""), 4000);
			return;
		}

		if (currentId) {
			try {
				await editMovie(currentId, formData);
				setNotification("Movie edited successfuly");
			} catch (error) {
				setNotification("Error occurred when editing movie");
			}
			setTimeout(() => setNotification(""), 4000);
			setCurrentId("");
		} else {
			try {
				await postMovie(formData);
				setNotification("Movie added successfuly");
			} catch (error) {
				setNotification("Error occurred when adding movie");
			}
			setTimeout(() => setNotification(""), 4000);
		}
		// refetching data
		getMovies();
		// clearing form data
		clearData();
		// clearing rating (stars)
		disabledInput.current!.checked = true;
	};

	return (
		<form className="form" onSubmit={handleMovieSubmit}>
			<h2 className="form__title">{currentId ? "Edit" : "Add"} Movie</h2>
			<div className="form__input-box">
				<label htmlFor="title">Title</label>
				<input
					type="text"
					id="title"
					value={formData.title}
					onChange={(e) => setFormData({ ...formData, title: e.target.value })}
				/>
			</div>

			<div className="form__input-box">
				<label htmlFor="director">Direction</label>
				<input
					type="text"
					id="director"
					value={formData.director}
					onChange={(e) =>
						setFormData({ ...formData, director: e.target.value })
					}
				/>
			</div>
			<div className="form__input-box">
				<label htmlFor="category">Category</label>
				<input
					type="text"
					id="category"
					value={formData.category}
					onChange={(e) =>
						setFormData({ ...formData, category: e.target.value })
					}
				/>
			</div>
			<div className="form__input-box">
				<label htmlFor="year">year</label>
				<input
					type="number"
					id="year"
					min={1895}
					max={new Date().getFullYear()}
					value={formData.year}
					onChange={(e) => setFormData({ ...formData, year: e.target.value })}
				/>
			</div>
			<div className="form__input-box form__rating-box">
				<label>Rate</label>
				<div className="form__rating">
					<input
						type="radio"
						name="rating"
						id="clear-rating"
						aria-label="clear your rate"
						ref={disabledInput}
						defaultChecked
						disabled
					/>
					<label htmlFor="rating-1">
						<div className="star"></div>
					</label>
					<input
						type="radio"
						name="rating"
						id="rating-1"
						aria-label="rate 1 out of 5"
						value={1}
						onClick={(e) =>
							setFormData({
								...formData,
								rate: parseInt((e.target as HTMLInputElement).value),
							})
						}
					/>
					<label htmlFor="rating-2">
						<div className="star"></div>
					</label>
					<input
						type="radio"
						name="rating"
						id="rating-2"
						aria-label="rate 2 out of 5"
						value={2}
						onClick={(e) =>
							setFormData({
								...formData,
								rate: parseInt((e.target as HTMLInputElement).value),
							})
						}
					/>
					<label htmlFor="rating-3">
						<div className="star"></div>
					</label>
					<input
						type="radio"
						name="rating"
						id="rating-3"
						aria-label="rate 3 out of 5"
						value={3}
						onClick={(e) =>
							setFormData({
								...formData,
								rate: parseInt((e.target as HTMLInputElement).value),
							})
						}
					/>
					<label htmlFor="rating-4">
						<div className="star"></div>
					</label>
					<input
						type="radio"
						name="rating"
						id="rating-4"
						aria-label="rate 4 out of 5"
						value={4}
						onClick={(e) =>
							setFormData({
								...formData,
								rate: parseInt((e.target as HTMLInputElement).value),
							})
						}
					/>
					<label htmlFor="rating-5">
						<div className="star"></div>
					</label>
					<input
						type="radio"
						name="rating"
						id="rating-5"
						aria-label="rate 5 out of 5"
						value={5}
						onClick={(e) =>
							setFormData({
								...formData,
								rate: parseInt((e.target as HTMLInputElement).value),
							})
						}
					/>
				</div>
			</div>
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
