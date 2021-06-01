import {
  GET_OWNED_MENU,
  GET_OWNED_MENUS,
  CREATE_OWNED_MENU,
  DELETE_OWNED_MENU,
  UPDATE_OWNED_MENU,
  OWNED_MENU_ERROR,
} from "../actions/types";

const initialState = {
  loading: true,
  menus: [],
  menu: null,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_OWNED_MENU:
      return {
        ...state,
        loading: false,
        menu: payload,
      };
    case GET_OWNED_MENUS:
      return {
        ...state,
        loading: false,
        menu: null,
        menus: payload,
      };
    case DELETE_OWNED_MENU:
      return {
        ...state,
        loading: false,
        menus: state.menus.filter((menu) => menu._id !== payload),
      };
    case OWNED_MENU_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case UPDATE_OWNED_MENU:
      return {
        ...state,
        loading: false,
        menu: payload,
      };
    case CREATE_OWNED_MENU: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
}
