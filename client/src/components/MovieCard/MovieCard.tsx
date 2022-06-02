import { FilmType } from "../../App";
import { deleteMovie } from "../../api";
// ICONS
import {
	AiOutlineLike,
	AiOutlineEdit,
	AiOutlineDelete,
	AiOutlineAppstore,
	AiOutlineSolution,
} from "react-icons/ai";
import { IoIosToday } from "react-icons/io";
// STYLES
import "./MovieCard.css";

type MovieCardProps = {
	movies: FilmType[];
	setMovies: React.Dispatch<React.SetStateAction<FilmType[]>>;
	movieData: FilmType;
	setFormData: React.Dispatch<React.SetStateAction<FilmType>>;
	setCurrentId: React.Dispatch<React.SetStateAction<string>>;
};

const MovieCard: React.FC<MovieCardProps> = ({
	movieData,
	setCurrentId,
	setFormData,
	movies,
	setMovies,
}) => {
	const handleRemoveMovie = async (id: string) => {
		try {
			await deleteMovie(id);
			setMovies(movies.filter((movie) => movie._id !== id));
		} catch (error) {}
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
						{movieData.rate / 20} / 5
					</p>
					<p>
						<AiOutlineAppstore />
						{movieData.category}
					</p>
				</div>
				<div className="movie-card__buttons">
					<button
						aria-label="delete this movie"
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
