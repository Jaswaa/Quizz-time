// App.js
import React, { useState } from "react";
import "./App.css";
import questions from './Questions';

function App() {
  const [showFinalResults, setFinalResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [highlightedQuestions, setHighlightedQuestions] = useState(Array.from({ length: questions.length }, () => false));
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const optionClicked = (option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestion] = option;
    setSelectedOptions(updatedOptions);

    if (option.isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinalResults(true);
    }
  };

  const highlightClicked = () => {
    const updatedHighlights = [...highlightedQuestions];
    updatedHighlights[currentQuestion] = true;
    setHighlightedQuestions(updatedHighlights);
  };

  const removeHighlightClicked = () => {
    const updatedHighlights = [...highlightedQuestions];
    updatedHighlights[currentQuestion] = false;
    setHighlightedQuestions(updatedHighlights);
  };

  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setFinalResults(false);
    setSelectedOptions([]);
    setHighlightedQuestions(Array.from({ length: questions.length }, () => false));
  };
  return (
    <div className={`App ${darkTheme ? 'dark-theme' : ''}`}>
      <h className="head"> Quiz Time</h>
      <button className="theme-button" onClick={toggleTheme}>
        Theme
      </button>
      {showFinalResults ? (
        <div className="results">
          <h2> You have Completed the quiz </h2>
          <p> <b>Your Marks :</b> {score}</p>
          <p> <b>Your Score : </b>{(score / questions.length).toFixed(2) * 100} %</p>
          <button onClick={() => restartGame()}> Restart </button>
        </div>
      ) : (
        <div className="row p-3">
          <div className={`question-card  ${darkTheme ? 'dark-theme-card' : ''}`}>
            <h3> Question :  {currentQuestion + 1} out of {questions.length} </h3>
            <h4 className={`question-text  ${highlightedQuestions[currentQuestion] ? 'highlighted' : ''}`}>
              Q. {currentQuestion + 1}. {questions[currentQuestion].text}
            </h4>
            <ul>
              <div className="justify-content-md-end">
                {questions[currentQuestion].options.map((option) => (
                  <li
                    onClick={() => optionClicked(option)}
                    key={option.id}
                    className={highlightedQuestions[currentQuestion] ? 'highlighted-option' : ''}
                  >
                    {option.text}
                  </li>
                ))}
              </div>
            </ul>
            <div className="button-section">
              <button
                className="highlight"
                onClick={() => highlightClicked()}
              >
                Highlight
              </button>
              <button
                className="highlight"
                onClick={() => removeHighlightClicked()}
              >Remove Highlight
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
