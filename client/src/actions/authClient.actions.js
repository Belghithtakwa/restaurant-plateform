import axios from "axios";
import {
  USER_AUTH_ERROR,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_SUCCESS,
} from "./types";

export const registerClient = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(
      "http://localhost:8000/api/auth/register",
      data,
      config
    );
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
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      "http://localhost:8000/api/auth/login",
      data,
      config
    );
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
