import axios from "axios";
import {
  OWNED_RESTAURANT_ERROR,
  GET_OWNED_RESTAURANT,
  GET_OWNED_RESTAURANTS,
  CREATE_OWNED_RESTAURANT,
  DELETE_OWNED_RESTAURANT,
  UPDATE_OWNED_RESTAURANT,
} from "./types";

export const getOwnedRestaurants = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/restaurants/me");
    dispatch({
      type: GET_OWNED_RESTAURANTS,
      payload: res.data.restaurants,
    });
  } catch (err) {
    dispatch({
      type: OWNED_RESTAURANT_ERROR,
      payload: err,
    });
  }
};
export const getOwnedRestaurant = (restaurantId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/restaurants/me/${restaurantId}`);
    dispatch({
      type: GET_OWNED_RESTAURANT,
      payload: res.data.restaurant,
    });
  } catch (err) {
    dispatch({
      type: OWNED_RESTAURANT_ERROR,
      payload: err,
    });
  }
};
