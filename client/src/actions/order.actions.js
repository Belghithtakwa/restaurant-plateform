import axios from "axios";
import {
  OWNED_ORDER_ERROR,
  GET_OWNED_ORDER,
  GET_OWNED_ORDERS,
  CREATE_CLIENT_ORDER,
  DELETE_OWNED_ORDER,
  UPDATE_OWNED_ORDER,
  ADD_TO_CLIENT_ORDER,
} from "./types";

export const getOwnedOrders = (restaurantId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/orders/me/${restaurantId}`
    );
    dispatch({
      type: GET_OWNED_ORDERS,
      payload: res.data.orders,
    });
  } catch (err) {
    dispatch({
      type: OWNED_ORDER_ERROR,
      payload: err,
    });
  }
};
export const getOwnedOrder = (orderId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/orders/${orderId}`
    );
    dispatch({
      type: GET_OWNED_ORDER,
      payload: res.data.order,
    });
  } catch (err) {
    dispatch({
      type: OWNED_ORDER_ERROR,
      payload: err,
    });
  }
};

export const createClientOrder = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };
  try {
    const res = await axios.post(
      `http://localhost:8000/api/orders/client`,
      data,
      config
    );
    dispatch({
      type: CREATE_CLIENT_ORDER,
      payload: res.order
    });
  } catch (err) {
    dispatch({
      type: OWNED_ORDER_ERROR,
      payload: err,
    });
  }
};
export const addToClientOrder =
  (data, orderId) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };
    try {
      const res = await axios.put(
        `http://localhost:8000/api/orders/client/${orderId}`,
        data,
        config
      );
      dispatch({
        type: ADD_TO_CLIENT_ORDER,
        payload: res.order
      });
    } catch (err) {
      dispatch({
        type: OWNED_ORDER_ERROR,
        payload: err,
      });
    }
  };
export const deleteOwnedOrder = (orderId, restaurantId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:8000/api/menus/me/${restaurantId}/${orderId}`
    );
    dispatch({
      type: DELETE_OWNED_ORDER,
      payload: res.data.deletedOrder._id,
    });
  } catch (err) {
    dispatch({
      type: OWNED_ORDER_ERROR,
      payload: err,
    });
  }
};
export const updateOwnedOrder =
  (data, orderId, restaurantId) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/orders/me/${restaurantId}/${orderId}`,
        data,
        config
      );
      dispatch({
        type: UPDATE_OWNED_ORDER,
        payload: res.data.updatedOrder,
      });
    } catch (err) {
      dispatch({
        type: OWNED_ORDER_ERROR,
        payload: err,
      });
    }
  };
