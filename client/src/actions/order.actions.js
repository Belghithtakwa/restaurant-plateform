import axios from "axios";
import {
  OWNED_ORDER_ERROR,
  GET_OWNED_ORDER,
  CREATE_CLIENT_ORDER,
  DELETE_OWNED_ORDER,
  UPDATE_OWNED_ORDER,
  ADD_TO_CLIENT_ORDER,
  CHECKOUT_OWNED_ORDER,
  GET_MANAGER_ORDER,
  GET_MANAGER_ORDERS,
  CONFIRM_ORDER,
  CANCEL_ORDER,
  GET_CLIENT_ORDERS,
} from "./types";
export const getClientOrders = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/orders`);
    dispatch({
      type: GET_CLIENT_ORDERS,
      payload: res.data.orders,
    });
  } catch (err) {
    dispatch({
      type: OWNED_ORDER_ERROR,
      payload: err,
    });
  }
};
export const getManagerOrders = (restaurantId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/restaurants/${restaurantId}/orders`);
    dispatch({
      type: GET_MANAGER_ORDERS,
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
    const res = await axios.get(`/api/orders/client/${orderId}`);
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
export const getManagerOrder = (orderId, restaurantId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/restaurants/${restaurantId}/orders/${orderId}`
    );
    dispatch({
      type: GET_MANAGER_ORDER,
      payload: res.data.order,
    });
  } catch (err) {
    dispatch({
      type: OWNED_ORDER_ERROR,
      payload: err,
    });
  }
};
export const getOwnedOrderByCode = (code) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/orders/client/${code}/bycode`);
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
export const createClientOrder = (data, restaurantId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };
  try {
    const res = await axios.post(
      `/api/orders/${restaurantId}/client`,
      data,
      config
    );
    dispatch({
      type: CREATE_CLIENT_ORDER,
      payload: res.data.order,
    });
  } catch (err) {
    dispatch({
      type: OWNED_ORDER_ERROR,
      payload: err,
    });
  }
};
export const addToClientOrder =
  (data, orderId, restaurantId) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };
    try {
      const res = await axios.put(
        `/api/orders/${restaurantId}/client/${orderId}`,
        data,
        config
      );
      dispatch({
        type: ADD_TO_CLIENT_ORDER,
        payload: res.data.order,
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
    const res = await axios.delete(`/api/menus/me/${restaurantId}/${orderId}`);
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
      const res = await axios.put(
        `/api/orders/me/${restaurantId}/${orderId}`,
        data,
        config
      );
      dispatch({
        type: UPDATE_OWNED_ORDER,
        payload: res.data.order,
      });
    } catch (err) {
      dispatch({
        type: OWNED_ORDER_ERROR,
        payload: err,
      });
    }
  };
export const checkoutClientOrder = (orderId, data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };
  try {
    const res = await axios.put(
      `/api/orders/client/${orderId}/checkout`,
      data,
      config
    );
    dispatch({
      type: CHECKOUT_OWNED_ORDER,
      payload: res.data.order,
    });
  } catch (err) {
    dispatch({
      type: OWNED_ORDER_ERROR,
      payload: err,
    });
  }
};

export const confirmOrder = (orderId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/orders/${orderId}/confirm`);
    dispatch({
      type: CONFIRM_ORDER,
      payload: res.data.order,
    });
  } catch (err) {
    dispatch({
      type: OWNED_ORDER_ERROR,
      payload: err,
    });
  }
};
export const cancelOrder = (orderId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/orders/${orderId}/cancel`);
    dispatch({
      type: CANCEL_ORDER,
      payload: res.data.order,
    });
  } catch (err) {
    dispatch({
      type: OWNED_ORDER_ERROR,
      payload: err,
    });
  }
};
