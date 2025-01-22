import React, { useReducer, useEffect } from "react";
import quizReducer, { initialState } from "./QuizReducer";
import styled from "styled-components";

function QuizApp() {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  useEffect(() => {
    if (state.timeLeft === 0) {
      dispatch({ type: "NEXT_QUESTION" });
    }

    const timer = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.timeLeft]);

  if (state.isQuizFinished) {
    return (
      <QuizContainer>
        <h1>Quiz terminé !</h1>
        <p>Votre score : {state.score} / {state.questions.length}</p>
        <RestartButton onClick={() => dispatch({ type: "RESET" })}>
          Recommencer
        </RestartButton>
      </QuizContainer>
    );
  }

  const currentQuestion = state.questions[state.currentQuestion];

  return (
    <QuizContainer>
      <h1>Quiz</h1>
      <Timer>Temps restant : {state.timeLeft}s</Timer>
      <div>
        <QuestionTitle>{currentQuestion.question}</QuestionTitle>
        <div>
          {currentQuestion.options.map((option, index) => (
            <OptionButton
              key={index}
              onClick={() => dispatch({ type: "ANSWER_QUESTION", payload: option })}
            >
              {option}
            </OptionButton>
          ))}
        </div>
      </div>
      <RestartButton onClick={() => dispatch({ type: "RESET" })}>
        Recommencer
      </RestartButton>
    </QuizContainer>
  );
}

export default QuizApp;

const QuizContainer = styled.div`
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 600px;
  padding: 20px;
  text-align: center;
  margin: auto;
  margin-top: 50px;
`;

const Timer = styled.p`
  font-size: 18px;
  color: #ff5722;
  margin-bottom: 20px;
`;

const QuestionTitle = styled.h2`
  color: #555;
`;

const OptionButton = styled.button`
  display: block;
  width: 100%;
  background: #007bff;
  color: white;
  border: none;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

const RestartButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background: #218838;
  }
`;