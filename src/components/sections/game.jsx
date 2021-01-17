import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { QUESTION_QUANTITY } from "../../constants/constants";
import GameContext from "../../context/game/gameContext";
import { shuffleArray } from "../../helpers/shuffler";
import Loading from "../layout/loading";
import TopBar from "../layout/topBar";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

function Game() {
  const {
    userInfo,
    questions,
    getQuestions,
    loadingService,
    setTimeStart,
    setTimeEnd,
    saveResults,
  } = useContext(GameContext);
  const history = useHistory();
  const [actualQuestion, saveActualQuestion] = useState({});
  const [questionNumber, saveQuestionNumber] = useState(0);
  const [correctAnswers, saveCorrectAnswers] = useState(0);

  useEffect(() => {
    console.log("service changed", { loadingService, questions });
    if (!userInfo.category) {
      let path = ``;
      history.push(path);
      return;
    }
    if (!questions.results) {
      console.log({ questions });
      getQuestions();
      setTimeStart();
    } else {
      setActualQuestion(0);
    }
  }, [loadingService]);

  const setActualQuestion = (num) => {
    questions.results[num].answers = [
      ...questions.results[num].incorrect_answers,
      questions.results[num].correct_answer,
    ];
    shuffleArray(questions.results[num].answers);
    saveActualQuestion(questions.results[num]);
  };

  const setNextQuestion = (selected) => {
    if (questionNumber != QUESTION_QUANTITY) {
      saveQuestionNumber(questionNumber + 1);
      saveCorrectAnswers(
        selected === actualQuestion.correct_answer
          ? correctAnswers + 1
          : correctAnswers
      );
      setActualQuestion(questionNumber);
    } else {
      setTimeEnd();
      saveResults(correctAnswers, goToScores);
    }
  };

  const goToScores = () => {
      let path = `scores`;
      history.push(path);
  }

  // const markup = (a) => {
  //   let e = document.createElement('div');
  //   e.innerHTML = a;
  //   return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  // };

  if (loadingService) {
    return (<Loading></Loading>);
  }

  return (
    <>
      <TopBar></TopBar>
      <div className="big-container flex-row">
        <div className="section flex-column">
          <div className="title yellow">
            {questionNumber + 1}
            {". "}
            {ReactHtmlParser(actualQuestion.question)}
          </div>
          <div className="flex-column box bg-yellow">
            {actualQuestion.answers &&
              actualQuestion.answers.map((a) => (
                <p
                  key={a}
                  className="response-container pink"
                  onClick={() => setNextQuestion(a)}
                >{ReactHtmlParser(a)}</p>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
