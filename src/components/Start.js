export default function Start(props) {
	return (
		<div className="quiz--page">
			<h1 className="intro--header">Quizzical</h1>
			<p className="intro--description">Quiz about Computer Science</p>
			<button className="intro--btn" onClick={props.handleStart}>
				Start Quiz
			</button>
		</div>
	);
}
