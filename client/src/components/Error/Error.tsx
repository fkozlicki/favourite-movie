import { AiOutlineReload } from "react-icons/ai";
import "./Error.css";

type ErrorPropsType = {
	message: string;
};

const Error: React.FC<ErrorPropsType> = ({ message }) => {
	return (
		<div className="app__error">
			<p>Error: {message}</p>
			<p>Try to reload the page.</p>
			<button aria-label="reload page" onClick={() => window.location.reload()}>
				<AiOutlineReload />
			</button>
		</div>
	);
};

export default Error;
