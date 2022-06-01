type RatingContainerPropsType = {
	children: JSX.Element;
	disabledInputRef: React.RefObject<HTMLInputElement>;
};

const RatingContainer: React.FC<RatingContainerPropsType> = ({
	children,
	disabledInputRef,
}) => {
	return (
		<div className="form__input-box form__rating-box">
			<label>Rate</label>
			<div className="form__rating">
				<input
					type="radio"
					name="rating"
					id="clear-rating"
					aria-label="clear your rate"
					ref={disabledInputRef}
					defaultChecked
					disabled
				/>
				{children}
			</div>
		</div>
	);
};

export default RatingContainer;
