import axios from "axios";
import {
  OWNED_FEEDBACK_ERROR,
  GET_OWNED_FEEDBACK,
  GET_OWNED_FEEDBACKS,
  CREATE_OWNED_FEEDBACK,
  DELETE_OWNED_FEEDBACK,
  UPDATE_OWNED_FEEDBACK,
} from "./types";
export const getOwnedFeedbacks = (restaurantId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/feedbacks/me/${restaurantId}`);
    dispatch({
      type: GET_OWNED_FEEDBACKS,
      payload: res.data.feedbacks,
    });
  } catch (err) {
    dispatch({
      type: OWNED_FEEDBACK_ERROR,
      payload: err,
    });
  }
};
export const getOwnedFeedback =
  (feedbackId, restaurantId) => async (dispatch) => {
    try {
      const res = await axios.get(
        `/api/feedbacks/me/${restaurantId}/${feedbackId}`
      );
      dispatch({
        type: GET_OWNED_FEEDBACK,
        payload: res.data.feedback,
      });
    } catch (err) {
      dispatch({
        type: OWNED_FEEDBACK_ERROR,
        payload: err,
      });
    }
  };
export const createOwnedFeedback = (data, restaurantId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };
  try {
    await axios.post(`/api/feedbacks/me/${restaurantId}`, data, config);
    dispatch({
      type: CREATE_OWNED_FEEDBACK,
    });
  } catch (err) {
    dispatch({
      type: OWNED_FEEDBACK_ERROR,
      payload: err,
    });
  }
};

export const deleteOwnedFeedback =
  (feedbackId, restaurantId) => async (dispatch) => {
    try {
      const res = await axios.delete(
        `/api/feedbacks/me/${restaurantId}/${feedbackId}`
      );
      dispatch({
        type: DELETE_OWNED_FEEDBACK,
        payload: res.data.deletedFeedback._id,
      });
    } catch (err) {
      dispatch({
        type: OWNED_FEEDBACK_ERROR,
        payload: err,
      });
    }
  };
export const updateOwnedFeedback =
  (data, feedbackId, restaurantId) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };
    try {
      const res = await axios.delete(
        `/api/feedbacks/me/${restaurantId}/${feedbackId}`,
        data,
        config
      );
      dispatch({
        type: UPDATE_OWNED_FEEDBACK,
        payload: res.data.updatedFeedback,
      });
    } catch (err) {
      dispatch({
        type: OWNED_FEEDBACK_ERROR,
        payload: err,
      });
    }
  };
