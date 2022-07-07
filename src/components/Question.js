import { nanoid } from "nanoid";
export default function Question(props) {
	function chooseAnswer(event, question, id) {
		props.choosedAnswer(question, event.target.textContent, id);
	}
	function getBg(searchId) {
		if (document.getElementById(searchId) !== null) {
			let bg = "";

			if (props.checkedAnswers) {
				if (document.getElementById(searchId).id === props.data.buttonId) {
					if (props.data.answerState === true) {
						bg = "#94D7A2";
					} else {
						bg = "#F8BCBC";
					}
				} else {
					if (
						document.getElementById(props.data.correctButtonId) !== null &&
						document.getElementById(props.data.correctButtonId).id === searchId
					) {
						bg = "#94D7A2";
					} else {
						bg = "transparent";
					}
				}
			} else {
				if (document.getElementById(searchId).id === props.data.buttonId) {
					bg = "#D6DBF5";
				} else {
					bg = "transparent";
				}
			}
			return bg;
		}
	}
	function getOpacity(id) {
		if (document.getElementById(id) !== null) {
			let bg = "";

			if (props.checkedAnswers) {
				if (document.getElementById(id).id === props.data.buttonId) {
					if (props.data.answerState === true) {
						bg = "1";
					} else {
						bg = "1";
					}
				} else {
					if (
						document.getElementById(props.data.correctButtonId) !== null &&
						document.getElementById(props.data.correctButtonId).id === id
					) {
						bg = "1";
					} else {
						bg = "0.5";
					}
				}
			} else {
				bg = "1";
			}
			return bg;
		}
	}
	function htmlDecode(input) {
		var doc = new DOMParser().parseFromString(input, "text/html");
		return doc.documentElement.textContent;
	}
	return (
		props.data && (
			<div className="question" key={props.data.id}>
				<h2 className="question--header">{htmlDecode(props.data.question)}</h2>
				<div className="question--choices">
					{props.data &&
						props.data.answers.map((e, i) => {
							let choiceId = props.data.id + "," + i;
							return (
								<button
									style={{
										backgroundColor: getBg(choiceId),
										opacity: getOpacity(choiceId),
									}}
									key={nanoid()}
									onClick={(event) =>
										!props.checkedAnswers
											? chooseAnswer(event, props.data.question, choiceId)
											: null
									}
									id={choiceId}
								>
									{htmlDecode(e)}
								</button>
							);
						})}
				</div>
			</div>
		)
	);
}
