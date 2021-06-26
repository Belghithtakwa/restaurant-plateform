import axios from "axios";
import { MESSAGE_ERROR, SEND_MESSAGE } from "./types";

export const sendMessage = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/messages", data, config);
    dispatch({
      type: SEND_MESSAGE,
      payload: res.data.message,
    });
  } catch (err) {
    dispatch({
      type: MESSAGE_ERROR,
      payload: err,
    });
  }
};
