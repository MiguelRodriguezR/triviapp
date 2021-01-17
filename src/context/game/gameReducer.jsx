import { ADD_USER_INFO, GET_QUESTIONS, GET_SCORES, LOADING_SERVICE, SET_TIME_END, SET_TIME_START, VALIDATE_FORM } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case VALIDATE_FORM:
      return {
        ...state,
        errorForm: action.payload,
      };
    case ADD_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
        errorForm: "",
      };
    case GET_QUESTIONS:
      return {
        ...state,
        loadingService: false,
        questions: action.payload,
      };
    case GET_SCORES:
      return {
        ...state,
        loadingService: false,
        scores: action.payload,
      };
    case LOADING_SERVICE:
      return {
        ...state,
        loadingService: true,
      };
    case SET_TIME_START:
      return {
        ...state,
        timeStart: action.payload,
      };
    case SET_TIME_END:
      return {
        ...state,
        timeEnd: action.payload,
      };
    default:
      return state;
  }
};
