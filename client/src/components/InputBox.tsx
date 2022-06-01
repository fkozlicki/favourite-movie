import React from "react";

type InputBoxProps = {
	title: string;
	type: string;
	inputValue: string;
	onChange: React.Dispatch<React.SetStateAction<string>>;
};

const InputBox: React.FC<InputBoxProps> = ({
	title,
	type,
	inputValue,
	onChange,
}) => {
	return (
		<div className="form__input-box">
			<label htmlFor={title.toLocaleLowerCase()}>{title}</label>
			<input
				type={type}
				id="director"
				value={inputValue}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	);
};

export default InputBox;
