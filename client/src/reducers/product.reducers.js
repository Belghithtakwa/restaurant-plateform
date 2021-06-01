import {
  GET_PRODUCT,
  GET_PRODUCTS,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  PRODUCT_ERROR,
  GET_PRODUCTS_BY_CATEGORY,
} from "../actions/types";
const initialState = {
  loading: true,
  products: [],
  product: null,
  error: {},
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCT:
      return {
        ...state,
        loading: false,
        product: payload,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        loading: false,
        product: null,
        products: payload,
      };
    case GET_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        loading: false,
        product: null,
        products: payload,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        loading: false,
        products: state.products.filter((product) => product._id !== payload),
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        loading: false,
        product: payload,
      };
    case CREATE_PRODUCT: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
}
