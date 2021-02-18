import {
  LECTURE_LIST_REQUEST,
  LECTURE_LIST_SUCCESS,
  LECTURE_LIST_FAIL,
  LECTURE_DETAILS_REQUEST,
  LECTURE_DETAILS_FAIL,
  LECTURE_DETAILS_SUCCESS,
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

export const lectureDetailsReducer = (
  state = { lecture: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case LECTURE_DETAILS_REQUEST:
      return { loading: true, ...state };
    case LECTURE_DETAILS_SUCCESS:
      return { loading: false, lecture: action.payload };
    case LECTURE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
