import { useState } from "react";
import "./App.css";

const questions = [
  {
    question: "Which language is used to style web pages?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    answer: "CSS",
  },
  {
    question: "Which hook is used to manage state in React?",
    options: ["useEffect", "useRef", "useState", "useMemo"],
    answer: "useState",
  },
  {
    question: "Which HTML tag is used for a heading?",
    options: ["<p>", "<h1>", "<div>", "<span>"],
    answer: "<h1>",
  },
  {
    question: "Which method adds an item to the end of an array?",
    options: ["pop()", "shift()", "push()", "slice()"],
    answer: "push()",
  },
  {
    question: "What does JSX stand for?",
    options: [
      "Java Syntax Extension",
      "JavaScript XML",
      "Java Source XML",
      "JSON XML",
    ],
    answer: "JavaScript XML",
  },
];

function App() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[current];

  function handleAnswer(option) {
    if (selected !== "") return;

    setSelected(option);

    if (option === question.answer) {
      setScore((previous) => previous + 1);
    }
  }

  function handleNext() {
    if (current < questions.length - 1) {
      setCurrent((previous) => previous + 1);
      setSelected("");
    } else {
      setFinished(true);
    }
  }

  function restartQuiz() {
    setCurrent(0);
    setSelected("");
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="page">
        <div className="quiz-card result-card">
          <div className="result-icon">correct answer</div>
          <h1>Quiz Completed!</h1>
          <p className="result-text">Your final score is</p>
          <h2>
            {score} / {questions.length}
          </h2>
          <p>
            {score === questions.length
              ? "Excellent! You got all answers correct!"
              : "Good try! Keep practicing to improve."}
          </p>
          <button className="next-btn" onClick={restartQuiz}>
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="quiz-card">
        <p className="tag">REACT QUIZ APP</p>

        <h1>Test Your Knowledge</h1>

        <div className="progress-info">
          <span>
            Question {current + 1} of {questions.length}
          </span>
          <span>Score: {score}</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((current + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        <h2 className="question">{question.question}</h2>

        <div className="options">
          {question.options.map((option, index) => {
            let className = "option";

            if (selected !== "") {
              if (option === question.answer) {
                className += " correct";
              } else if (option === selected) {
                className += " wrong";
              }
            }

            return (
              <button
                key={option}
                className={className}
                onClick={() => handleAnswer(option)}
                disabled={selected !== ""}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            );
          })}
        </div>

        {selected !== "" && (
          <p className="feedback">
            {selected === question.answer
              ? "Correct answer! 🎉"
              : `Correct answer: ${question.answer}`}
          </p>
        )}

        <button
          className="next-btn"
          onClick={handleNext}
          disabled={selected === ""}
        >
          {current === questions.length - 1
            ? "Show Result"
            : "Next Question →"}
        </button>
      </div>
    </div>
  );
}

export default App;