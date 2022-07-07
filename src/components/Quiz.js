import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import Question from "./Question";
export default function Quiz() {
	const [data, setData] = useState(null);
	const [questions, setQuestions] = useState(null);
	const [checkedAnswers, setCheckedAnswers] = useState(false);
	const [scores, setScores] = useState(0);
	const [playAgain, setPlayAgian] = useState(false);
	const [errorMsg, setErrorMsg] = useState(false);
	useEffect(() => {
		fetch(
			"https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple"
		)
			.then((res) => res.json())
			.then((data) => setData(data.results));
	}, [playAgain]);

	function choosedAnswer(question, answer, id) {
		setQuestions((prevData) =>
			prevData.map((q) =>
				question === q.question
					? {
							...q,
							choosedAnswer: answer,
							buttonId: id,
					  }
					: q
			)
		);
	}
	function restart() {
		setPlayAgian((prev) => !prev);
		setCheckedAnswers((prev) => !prev);
	}
	useEffect(() => {
		if (data !== null) {
			setQuestions(
				data.map((q) => ({
					id: nanoid(),
					question: q.question,
					answers: [...shffuleElements(q)],
					correct_answer: q.correct_answer,
					choosedAnswer: "",
					buttonId: "",
					answerState: false,
					point: 0,
					correctButtonId: "",
				}))
			);
		}
	}, [data]);

	useEffect(() => {
		if (checkedAnswers) {
			let points = 0;
			questions.map((e) =>
				e.choosedAnswer === e.correct_answer ? (points = points + 1) : 0
			);
			setScores(points);
		}
	}, [checkedAnswers, questions]);

	function shffuleElements(data) {
		const shuffled = [data.correct_answer, ...data.incorrect_answers];
		let currentIndex = shuffled.length,
			randomIndex;
		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			[shuffled[currentIndex], shuffled[randomIndex]] = [
				shuffled[randomIndex],
				shuffled[currentIndex],
			];
		}
		// setQuestions(shuffled);
		return shuffled;
	}

	function checkAllChoices(questions) {
		if (questions !== null) {
			const state = questions.every((e) => e.choosedAnswer !== "");

			return state;
		}
		return false;
	}

	function getCorrectId(q) {
		let id = "";
		for (let i = 0; i < q.answers.length; i++) {
			if (q.answers[i] === q.correct_answer && q.answerState === false) {
				id = q.id + "," + i;
			}
		}

		return id;
	}

	// Error Message
	// useEffect(() => {
	// 	if (document.querySelector(".attention--msg") !== null) {
	// 		const id = setTimeout(() => {
	// 			document.querySelector(".attention--msg").classList.remove("show");
	// 			console.log(document.querySelector(".attention--msg").classList);
	// 		}, 3000);
	// 		// document.querySelector(".attention--msg").classList.remove("show");
	// 		setErrorMsg((prev) => !prev);
	// 		return () => setTimeout(id);
	// 	}
	// }, [errorMsg]);

	function showCheckedAnswers() {
		if (checkedAnswers) {
			setCheckedAnswers((prev) => !prev);
			questions.map((q) => ({
				id: nanoid(),
				question: q.question,
				answers: [...shffuleElements(q)],
				correct_answer: q.correct_answer,
				choosedAnswer: "",
				buttonId: "",
				answerState: false,
				point: 0,
				correctButtonId: "",
			}));
		} else if (checkAllChoices(questions)) {
			setCheckedAnswers((prev) => !prev);
			setQuestions((prevData) =>
				prevData.map((q) => {
					return q.choosedAnswer === q.correct_answer
						? {
								...q,
								answerState: !q.answerState,
								point: q.point + 1,
						  }
						: {
								...q,
								correctButtonId: getCorrectId(q),
						  };
				})
			);
		} else {
			alert("All choices are required");
		}
	}

	return (
		<div className="quiz--page">
			<div className="quiz--questions">
				{questions &&
					questions.map((q) => (
						<Question
							data={q}
							key={nanoid()}
							checkedAnswers={checkedAnswers}
							choosedAnswer={choosedAnswer}
						/>
					))}
			</div>

			<div className="bottom">
				<button
					className="check--answers--btn"
					onClick={() => (!checkedAnswers ? showCheckedAnswers() : restart())}
				>
					{!checkedAnswers ? "Check Answers" : "Play Again"}
				</button>
				{checkedAnswers ? (
					<p className="quiz--score">
						You scored{" "}
						<span
							style={{
								color: scores > 2 ? "#94D7A2" : "rgb(242 59 59)",
							}}
						>
							{scores}
						</span>
						/5 correct answers
					</p>
				) : null}
			</div>
		</div>
	);
}
