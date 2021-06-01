import {
  GET_OWNED_FEEDBACK,
  GET_OWNED_FEEDBACKS,
  CREATE_OWNED_FEEDBACK,
  DELETE_OWNED_FEEDBACK,
  UPDATE_OWNED_FEEDBACK,
  OWNED_FEEDBACK_ERROR,
} from "../actions/types";

const initialState = {
  loading: true,
  feedbacks: [],
  feedback: null,
  error: {},
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_OWNED_FEEDBACK:
      return {
        ...state,
        loading: false,
        feedback: payload,
      };
    case GET_OWNED_FEEDBACKS:
      return {
        ...state,
        loading: false,
        feedback: null,
        feedbacks: payload,
      };
    case DELETE_OWNED_FEEDBACK:
      return {
        ...state,
        loading: false,
        feedbacks: state.feedbacks.filter(
          (feedback) => feedback._id !== payload
        ),
      };
    case OWNED_FEEDBACK_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case UPDATE_OWNED_FEEDBACK:
      return {
        ...state,
        loading: false,
        feedback: payload,
      };
    case CREATE_OWNED_FEEDBACK: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
}
