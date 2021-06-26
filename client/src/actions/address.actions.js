import axios from "axios";
import {
  GET_ADDRESS,
  GET_ADDRESSES,
  DELETE_ADDRESS,
  UPDATE_ADDRESS,
  CREATE_ADDRESS,
  ADDRESS_ERROR,
} from "./types";
export const getAdresses = (restaurantId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/addresses/me/${restaurantId}`);
    dispatch({
      type: GET_ADDRESSES,
      payload: res.data.addresses,
    });
  } catch (err) {
    dispatch({
      type: ADDRESS_ERROR,
      payload: err,
    });
  }
};
export const getAddress = (addressId, restaurantId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/addresses/me/${restaurantId}/${addressId}`
    );
    dispatch({
      type: GET_ADDRESS,
      payload: res.data.address,
    });
  } catch (err) {
    dispatch({
      type: ADDRESS_ERROR,
      payload: err,
    });
  }
};
export const createAddress = (data, restaurantId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };
  try {
    await axios.post(`/api/feedbacks/me/${restaurantId}`, data, config);
    dispatch({
      type: CREATE_ADDRESS,
    });
  } catch (err) {
    dispatch({
      type: ADDRESS_ERROR,
      payload: err,
    });
  }
};

export const deleteAddress = (addressId, restaurantId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/api/feedbacks/me/${restaurantId}/${addressId}`
    );
    dispatch({
      type: DELETE_ADDRESS,
      payload: res.data.deletedAddress._id,
    });
  } catch (err) {
    dispatch({
      type: ADDRESS_ERROR,
      payload: err,
    });
  }
};
export const updateAddress =
  (data, addressId, restaurantId) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };
    try {
      const res = await axios.delete(
        `/api/addresses/me/${restaurantId}/${addressId}`,
        data,
        config
      );
      dispatch({
        type: UPDATE_ADDRESS,
        payload: res.data.updatedAddress,
      });
    } catch (err) {
      dispatch({
        type: ADDRESS_ERROR,
        payload: err,
      });
    }
  };
