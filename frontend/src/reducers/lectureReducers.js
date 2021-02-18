import {
  LECTURE_LIST_REQUEST,
  LECTURE_LIST_SUCCESS,
  LECTURE_LIST_FAIL,
} from "../constants/lectureConstants.js";

export const lectureListReducer = (state = { lectures: [] }, action) => {
  switch (action.type) {
    case LECTURE_LIST_REQUEST:
      return { loading: true, lectures: [] };
    case LECTURE_LIST_SUCCESS:
      return { loading: false, lectures: action.payload };
    case LECTURE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
