import axios from "axios";
import {
  USER_AUTH_ERROR,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_SUCCESS,
  USER_LOGOUT,
  USER_LOADING,
} from "./types";

export const registerClient = (data) => async (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/auth/client/register", data, config);
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

export const loginClient = (data) => async (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/auth/client/login", data, config);
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

export const logoutClient = () => (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });
  dispatch({
    type: USER_LOGOUT,
  });
};
