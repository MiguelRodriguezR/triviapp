import React, { useReducer } from "react";
import { QUESTION_QUANTITY } from "../../constants/constants";
import {
  ADD_USER_INFO,
  GET_QUESTIONS,
  GET_SCORES,
  LOADING_SERVICE,
  SET_TIME_END,
  SET_TIME_START,
  VALIDATE_FORM,
} from "../../types";
import GameContext from "./gameContext";
import gameReducer from "./gameReducer";
import axios from "axios";
import clientAxios from "../../config/axios";

const TRIVIA_API_URL = "https://opentdb.com/api.php";

const GameState = (props) => {
  const initialState = {
    userInfo: {},
    questions: {},
    errorForm: "",
    timeStart: null,
    timeEnd: null,
    loadingService: false,
    results: {},
    scores: {}
  };

  const [state, dispatch] = useReducer(gameReducer, initialState);

  const showError = (error) => {
    dispatch({
      type: VALIDATE_FORM,
      payload: error,
    });
  };

  const addUserInfo = (userInfo) => {
    dispatch({
      type: ADD_USER_INFO,
      payload: userInfo,
    });
  };

  const getQuestions = async () => {
    try {
      dispatch({
        type: LOADING_SERVICE,
      });
      const result = await axios.get(
        `${TRIVIA_API_URL}?amount=${QUESTION_QUANTITY}&category=${state.userInfo.category}&type=multiple`
      );
      dispatch({
        type: GET_QUESTIONS,
        payload: result.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getScores = async () => {
    try {
      dispatch({
        type: LOADING_SERVICE,
      });
      const result = await clientAxios.get("/api/scores");
      result.data.scores.reverse();
      dispatch({
        type: GET_SCORES,
        payload: result.data,
      });
    } catch (error) {
      console.error(error);
    }
  }

  const setTimeStart = () => {
    dispatch({
      type: SET_TIME_START,
      payload: new Date(),
    });
  };

  const setTimeEnd = () => {
    dispatch({
      type: SET_TIME_END,
      payload: new Date(),
    });
  };

  const saveResults = async (results,callback) => {
    const dataSave = {
      nickname: state.userInfo.nickName,
      category: state.userInfo.category,
      trivia_duration: parseFloat("" + (Math.abs(state.timeStart - new Date()) / (1000 * 60 ))).toFixed(2),
      correct_answers: "" + results,
    };
    try {
      dispatch({
        type: LOADING_SERVICE,
      });
      const result = await clientAxios.post("/api/scores", dataSave);
      callback();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GameContext.Provider
      value={{
        userInfo: state.userInfo,
        errorForm: state.errorForm,
        questions: state.questions,
        loadingService: state.loadingService,
        results: state.results,
        scores: state.scores,
        setTimeStart,
        setTimeEnd,
        saveResults,
        addUserInfo,
        getQuestions,
        getScores,
        showError,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameState;
