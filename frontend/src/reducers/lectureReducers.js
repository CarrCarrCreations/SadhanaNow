import {
  LECTURE_LIST_REQUEST,
  LECTURE_LIST_SUCCESS,
  LECTURE_LIST_FAIL,
  LECTURE_DETAILS_REQUEST,
  LECTURE_DETAILS_FAIL,
  LECTURE_DETAILS_SUCCESS,
  LECTURE_DELETE_SUCCESS,
  LECTURE_DELETE_REQUEST,
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

export const lectureDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case LECTURE_DELETE_REQUEST:
      return { loading: true };
    case LECTURE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case LECTURE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
