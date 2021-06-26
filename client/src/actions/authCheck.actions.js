import axios from "axios";
import { USER_LOADING, USER_LOADED, USER_AUTH_ERROR } from "./types";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => async (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  // TODO: Set global env variable for base url
  try {
    const res = await axios.get("/api/auth/authcheck");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_AUTH_ERROR,
      payload: err,
    });
  }
};
