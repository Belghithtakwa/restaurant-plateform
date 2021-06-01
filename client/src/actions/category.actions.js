import axios from "axios";
import {
  CATEGORY_ERROR,
  GET_CATEGORY,
  GET_CATEGORIES,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
} from "./types";
export const getCategories = (restaurantId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/categories/${restaurantId}`
    );
    dispatch({
      type: GET_CATEGORIES ,
      payload: res.data.categories,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: err,
    });
  }
};
export const getCategory = (categoryId, restaurantId) => async (
  dispatch
) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/categories/${restaurantId}/${categoryId}`
    );
    dispatch({
      type: GET_CATEGORY,
      payload: res.data.category,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: err,
    });
  }
};
export const createCategory = (data, restaurantId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };
  try {
    await axios.post(
      `http://localhost:8000/api/categories/${restaurantId}`,
      data,
      config
    );
    dispatch({
      type: CREATE_CATEGORY,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: err,
    });
  }
};
export const deleteCategory = (categoryId, restaurantId) => async (
  dispatch
) => {
  try {
    const res = await axios.delete(
      `http://localhost:8000/api/categories/${restaurantId}/${categoryId}`
    );
    dispatch({
      type: DELETE_CATEGORY,
      payload: res.data.deletedCategory._id,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: err,
    });
  }
};
