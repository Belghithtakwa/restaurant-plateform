import axios from "axios";
import {
  DASHBOARD_ERROR,
  ORDER_CONFIRMATION_NUMBER,
  ORDER_NUMBER,
} from "./types";

export const getOrderNumber = (restaurantId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/dashboard/${restaurantId}/order_number`);
    dispatch({
      type: ORDER_NUMBER,
      payload: res.data.orderCount,
    });
  } catch (err) {
    dispatch({
      type: DASHBOARD_ERROR,
      payload: err,
    });
  }
};
export const getOrderConfirmationNumber =
  (restaurantId) => async (dispatch) => {
    try {
      const res = await axios.get(
        `/api/dashboard/${restaurantId}/order_confirmation_average`
      );
      dispatch({
        type: ORDER_CONFIRMATION_NUMBER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: DASHBOARD_ERROR,
        payload: err,
      });
    }
  };
