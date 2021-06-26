import axios from "axios";
import {
  OWNED_MENU_ERROR,
  GET_OWNED_MENU,
  GET_OWNED_MENUS,
  CREATE_OWNED_MENU,
  DELETE_OWNED_MENU,
  UPDATE_OWNED_MENU,
} from "./types";

export const getOwnedMenus = (restaurantId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/menus/${restaurantId}`);
    dispatch({
      type: GET_OWNED_MENUS,
      payload: res.data.menus,
    });
  } catch (err) {
    dispatch({
      type: OWNED_MENU_ERROR,
      payload: err,
    });
  }
};
export const getOwnedMenu = (menuId, restaurantId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/menus/${restaurantId}/${menuId}`);
    dispatch({
      type: GET_OWNED_MENU,
      payload: res.data.menu,
    });
  } catch (err) {
    dispatch({
      type: OWNED_MENU_ERROR,
      payload: err,
    });
  }
};

export const createOwnedMenu = (data, restaurantId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };
  try {
    await axios.post(`/api/menus/${restaurantId}`, data, config);
    dispatch({
      type: CREATE_OWNED_MENU,
    });
  } catch (err) {
    dispatch({
      type: OWNED_MENU_ERROR,
      payload: err,
    });
  }
};

export const deleteOwnedMenu = (menuId, restaurantId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/menus/${restaurantId}/${menuId}`);
    dispatch({
      type: DELETE_OWNED_MENU,
      payload: res.data.menu._id,
    });
  } catch (err) {
    dispatch({
      type: OWNED_MENU_ERROR,
      payload: err,
    });
  }
};
export const updateOwnedMenu =
  (data, menuId, restaurantId) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };
    try {
      const res = await axios.delete(
        `/api/menus/${restaurantId}/${menuId}`,
        data,
        config
      );
      dispatch({
        type: UPDATE_OWNED_MENU,
        payload: res.data.updatedMenu,
      });
    } catch (err) {
      dispatch({
        type: OWNED_MENU_ERROR,
        payload: err,
      });
    }
  };
