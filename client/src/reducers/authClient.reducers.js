import {
  CLIENT_AUTH_ERROR,
  CLIENT_LOADED,
  CLIENT_LOADING,
  CLIENT_LOGIN_FAIL,
  CLIENT_LOGIN_SUCCESS,
  CLIENT_LOGOUT,
  CLIENT_REGISTER_SUCCESS,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CLIENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLIENT_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case CLIENT_LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case CLIENT_AUTH_ERROR:
    case CLIENT_LOGIN_FAIL:
    case CLIENT_LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: payload,
      };
    case CLIENT_REGISTER_SUCCESS: {
      return {
        ...state,
        ...payload,
        loading: false,
      };
    }
    default:
      return state;
  }
}
