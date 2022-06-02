import "./InputBox.css";

type InputBoxPropsType = {
	title: string;
	type?: string;
	inputValue?: string;
	onChange?: (e: React.FormEvent) => void;
	children?: JSX.Element;
};

const InputBox: React.FC<InputBoxPropsType> = ({
	title,
	type,
	inputValue,
	onChange,
	children,
}) => {
	return (
		<div className="form__input-box">
			<label htmlFor={title}>{title}</label>
			{children ? (
				children
			) : (
				<input
					type={type}
					min={type === "number" ? 1895 : ""}
					max={type === "number" ? new Date().getFullYear() : ""}
					id={title}
					value={inputValue}
					onChange={onChange}
				/>
			)}
		</div>
	);
};

export default InputBox;
