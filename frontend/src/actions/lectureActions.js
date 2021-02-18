import axios from "axios";
import {
  LECTURE_LIST_REQUEST,
  LECTURE_LIST_SUCCESS,
  LECTURE_LIST_FAIL,
} from "../constants/lectureConstants.js";

export const listLectures = () => async (dispatch) => {
  try {
    dispatch({ type: LECTURE_LIST_REQUEST });

    const { data } = await axios.get("http://localhost:5000/api/lectures");

    dispatch({
      type: LECTURE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LECTURE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
