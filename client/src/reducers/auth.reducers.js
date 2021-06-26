import {
  USER_AUTH_ERROR,
  USER_LOADED,
  USER_LOADING,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_SUCCESS,
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
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case USER_LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      if (payload.user.restaurants) {
        localStorage.setItem("currentRestaurant", payload.user.restaurants[0]);
      }
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case USER_AUTH_ERROR:
    case USER_LOGIN_FAIL:
    case USER_LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("currentRestaurant");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: payload,
      };
    case USER_REGISTER_SUCCESS: {
      return {
        ...state,
        ...payload,
        loading: false,
        err: {},
      };
    }
    default:
      return state;
  }
}
