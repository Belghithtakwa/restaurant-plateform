import { MESSAGE_ERROR, SEND_MESSAGE } from "../actions/types";

const initialState = {
  loading: true,
  message: null,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SEND_MESSAGE:
      return {
        ...state,
        loading: false,
        message: payload,
      };
    case MESSAGE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
