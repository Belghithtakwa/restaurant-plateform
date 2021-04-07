import {
  MANAGER_AUTH_ERROR,
  MANAGER_LOADED,
  MANAGER_LOADING,
  MANAGER_LOGIN_FAIL,
  MANAGER_LOGIN_SUCCESS,
  MANAGER_LOGOUT,
  MANAGER_REGISTER_SUCCESS,
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
    case MANAGER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case MANAGER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case MANAGER_LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case MANAGER_AUTH_ERROR:
    case MANAGER_LOGIN_FAIL:
    case MANAGER_LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: payload,
      };
    case MANAGER_REGISTER_SUCCESS: {
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
