import { FilmType } from "../App";
import {
	AiOutlineLike,
	AiOutlineEdit,
	AiOutlineDelete,
	AiOutlineAppstore,
	AiOutlineSolution,
} from "react-icons/ai";
import { IoIosToday } from "react-icons/io";
import { useAppDispatch } from "../store";
import { deleteMovie } from "../actions/movies";

type Props = {
	movieData: FilmType;
	setFormData: React.Dispatch<React.SetStateAction<FilmType>>;
	setCurrentId: React.Dispatch<React.SetStateAction<string>>;
	setNotification: React.Dispatch<React.SetStateAction<string>>;
};

const MovieCard: React.FC<Props> = ({
	movieData,
	setCurrentId,
	setFormData,
	setNotification,
}) => {
	const dispatch = useAppDispatch();

	const handleRemoveMovie = (id: string) => {
		dispatch(deleteMovie(id));
		setTimeout(() => setNotification(""), 4000);
	};

	return (
		<div className="movie-card">
			<div>
				<img width={352} height={234} src={movieData.image} alt="" />
			</div>
			<div className="movie-card__content">
				<h2 className="movie-card__title">{movieData.title}</h2>
				<div className="movie-card__info">
					<p>
						<AiOutlineSolution />
						{movieData.director}
					</p>

					<p>
						<IoIosToday />
						{movieData.year}
					</p>
					<p>
						<AiOutlineLike />
						{movieData.rate} / 5
					</p>
					<p>
						<AiOutlineAppstore />
						{movieData.category}
					</p>
				</div>
				<div className="movie-card__buttons">
					<button
						aria-label="delete movie"
						onClick={() => handleRemoveMovie(movieData._id as string)}
					>
						<AiOutlineDelete />
					</button>
					<button
						aria-label="edit this movie"
						onClick={() => {
							setCurrentId(movieData._id as string);
							setFormData(movieData);
						}}
					>
						<AiOutlineEdit />
					</button>
				</div>
			</div>
		</div>
	);
};

export default MovieCard;
