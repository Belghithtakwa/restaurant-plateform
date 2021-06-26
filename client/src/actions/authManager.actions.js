import axios from "axios";
import {
  USER_AUTH_ERROR,
  USER_LOADING,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_SUCCESS,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
export const registerManager = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/auth/manager/register", data, config);
    dispatch({
      type: USER_REGISTER_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: USER_AUTH_ERROR,
      payload: err,
    });
  }
};

export const loginManager = (data) => async (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/auth/manager/login", data, config);
    setAuthToken(res.data.token);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: err,
    });
  }
};
export const logoutManager = () => (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });
  dispatch({
    type: USER_LOGOUT,
  });
};
