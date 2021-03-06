import axios from "axios";
import {
  LECTURE_LIST_REQUEST,
  LECTURE_LIST_SUCCESS,
  LECTURE_LIST_FAIL,
  LECTURE_DETAILS_REQUEST,
  LECTURE_DETAILS_SUCCESS,
  LECTURE_DETAILS_FAIL,
  LECTURE_DELETE_SUCCESS,
  LECTURE_DELETE_FAIL,
  LECTURE_DELETE_REQUEST,
} from "../constants/lectureConstants";

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

export const listLectureDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: LECTURE_DETAILS_REQUEST });

    const { data } = await axios.get(
      `http://localhost:5000/api/lectures/${id}`
    );

    dispatch({
      type: LECTURE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LECTURE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteLecture = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: LECTURE_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`http://localhost:5000/api/lectures/${id}`, config);

    dispatch({
      type: LECTURE_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LECTURE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
