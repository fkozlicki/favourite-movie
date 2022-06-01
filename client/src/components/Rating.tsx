import React from "react";

type RatingPropsType = {
	name: string;
	value: number;
	onClick: React.Dispatch<React.SetStateAction<number>>;
};

const Rating: React.FC<RatingPropsType> = ({ name, value, onClick }) => {
	return (
		<>
			<label htmlFor={name}>
				<div className="star"></div>
			</label>
			<input
				type="radio"
				name="rating"
				id={name}
				aria-label="rate 1 out of 5"
				value={value}
				onClick={(e) => onClick(parseInt((e.target as HTMLInputElement).value))}
			/>
		</>
	);
};

export default Rating;
