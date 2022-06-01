import { IMovie } from "../reducers/moviesSlice";
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
import { setCurrentMovieId } from "../reducers/moviesSlice";

type MovieCardProps = {
	movieData: IMovie;
};

const MovieCard: React.FC<MovieCardProps> = ({ movieData }) => {
	const dispatch = useAppDispatch();

	const handleEditMovie = () => {
		// set form data

		// set editing mode on
		dispatch(setCurrentMovieId(movieData._id));
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
						onClick={() => {
							if (movieData._id) dispatch(deleteMovie(movieData._id));
						}}
					>
						<AiOutlineDelete />
					</button>
					<button aria-label="edit this movie" onClick={() => handleEditMovie}>
						<AiOutlineEdit />
					</button>
				</div>
			</div>
		</div>
	);
};

export default MovieCard;
