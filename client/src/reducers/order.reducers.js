import {
  GET_OWNED_ORDER,
  GET_OWNED_ORDERS,
  CREATE_CLIENT_ORDER,
  ADD_TO_CLIENT_ORDER,
  DELETE_OWNED_ORDER,
  UPDATE_OWNED_ORDER,
  OWNED_ORDER_ERROR,
  CHECKOUT_OWNED_ORDER,
  GET_MANAGER_ORDER,
  GET_MANAGER_ORDERS,
  CONFIRM_ORDER,
  CANCEL_ORDER,
  GET_CLIENT_ORDERS,
} from "../actions/types";

const initialState = {
  loading: true,
  orders: [],
  order: null,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_OWNED_ORDER:
      return {
        ...state,
        loading: false,
        order: payload,
      };
    case GET_OWNED_ORDERS:
      return {
        ...state,
        loading: false,
        order: null,
        orders: payload,
      };
    case DELETE_OWNED_ORDER:
      return {
        ...state,
        loading: false,
        orders: state.orders.filter((order) => order._id !== payload),
      };
    case OWNED_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        order: null,
        error: payload,
      };
    case UPDATE_OWNED_ORDER:
      return {
        ...state,
        loading: false,
        order: payload,
      };
    case CREATE_CLIENT_ORDER:
      localStorage.setItem("orderId", payload._id);
      return {
        ...state,
        order: payload,
        loading: false,
      };
    case ADD_TO_CLIENT_ORDER:
      localStorage.setItem("orderId", payload._id);
      return {
        ...state,
        order: payload,
        loading: false,
      };
    case CHECKOUT_OWNED_ORDER:
      localStorage.removeItem("orderId");
      return {
        ...state,
        order: payload,
        loading: false,
      };
    case GET_MANAGER_ORDER:
      return {
        ...state,
        order: payload,
        loading: false,
      };
    case GET_MANAGER_ORDERS:
      return {
        ...state,
        orders: payload,
        loading: false,
      };
    case GET_CLIENT_ORDERS:
      return {
        ...state,
        orders: payload,
        loading: false,
      };
    case CONFIRM_ORDER:
      return {
        ...state,
        orders: payload,
        loading: false,
      };
    case CANCEL_ORDER:
      return {
        ...state,
        orders: payload,
        loading: false,
      };
    default:
      return state;
  }
}
