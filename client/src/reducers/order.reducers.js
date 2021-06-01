import {
  GET_OWNED_ORDER,
  GET_OWNED_ORDERS,
  CREATE_CLIENT_ORDER,
  ADD_TO_CLIENT_ORDER,
  DELETE_OWNED_ORDER,
  UPDATE_OWNED_ORDER,
  OWNED_ORDER_ERROR,
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
        error: payload,
      };
    case UPDATE_OWNED_ORDER:
      return {
        ...state,
        loading: false,
        order: payload,
      };
    case CREATE_CLIENT_ORDER:
      localStorage.setItem("orderId", payload.order._id);
      return {
        ...state,
        order: payload.order,
        loading: false,
      };
    case ADD_TO_CLIENT_ORDER:
      return {
        ...state,
        order: payload.order,
        loading: false,
      };
    default:
      return state;
  }
}
