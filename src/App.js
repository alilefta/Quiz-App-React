import "./App.css";
import { useState } from "react";
import Quiz from "./components/Quiz";
import Start from "./components/Start";
function App() {
	const [start, setStart] = useState(false);

	return (
		<div className="quiz--app">
			{start ? (
				<Quiz />
			) : (
				<Start handleStart={() => setStart((prev) => !prev)} />
			)}
		</div>
	);
}

export default App;
