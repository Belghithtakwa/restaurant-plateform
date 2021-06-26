import axios from "axios";
import {
  PRODUCT_ERROR,
  GET_PRODUCT,
  GET_PRODUCTS,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCTS_BY_CATEGORY,
  UPDATE_PRODUCT,
} from "./types";
export const getProducts = (restaurantId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/${restaurantId}`);
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data.products,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: err,
    });
  }
};
export const getProduct = (productId, restaurantId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/${restaurantId}/${productId}`);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data.product,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: err,
    });
  }
};
export const createProduct = (data, restaurantId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };
  try {
    await axios.post(`/api/products/${restaurantId}`, data, config);
    dispatch({
      type: CREATE_PRODUCT,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: err,
    });
  }
};
export const updateProduct =
  (data, productId, restaurantId) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };
    try {
      await axios.put(
        `/api/products/${restaurantId}/${productId}`,
        data,
        config
      );
      dispatch({
        type: UPDATE_PRODUCT,
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_ERROR,
        payload: err,
      });
    }
  };
export const deleteProduct = (productId, restaurantId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/api/products/${restaurantId}/${productId}`
    );

    dispatch({
      type: DELETE_PRODUCT,
      payload: res.data.deletedProduct._id,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: err,
    });
  }
};
export const getProductByCategory =
  (categoryId, restaurantId) => async (dispatch) => {
    try {
      const res = await axios.get(
        `/api/products/${restaurantId}?category=${categoryId}`
      );
      dispatch({
        type: GET_PRODUCTS_BY_CATEGORY,
        payload: res.data.products,
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_ERROR,
        payload: err,
      });
    }
  };
