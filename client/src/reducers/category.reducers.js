import {
  GET_CATEGORY,
  GET_CATEGORIES,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  CATEGORY_ERROR,
} from "../actions/types";
const initialState = {
  loading: true,
 categories: [],
  category: null,
  error: {},
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CATEGORY:
      return {
        ...state,
        loading: false,
       category: payload,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        loading: false,
        category: null,
        categories: payload,
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        loading: false,
        categories: state.categories.filter((category) => category._id !== payload),
      };
    case CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        loading: false,
        category: payload,
      };
    case CREATE_CATEGORY: {
      return {
        ...state,
        categories: [...state.categories, payload],
        loading: false,
      };
    }
    default:
      return state;
  }
}

