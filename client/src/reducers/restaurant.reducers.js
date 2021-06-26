import {
  GET_OWNED_RESTAURANT,
  GET_OWNED_RESTAURANTS,
  CREATE_OWNED_RESTAURANT,
  DELETE_OWNED_RESTAURANT,
  UPDATE_OWNED_RESTAURANT,
  OWNED_RESTAURANT_ERROR,
} from "../actions/types";

const initialState = {
  currentRestaurant: localStorage.getItem("currentRestaurant"),
  loading: true,
  restaurants: [],
  restaurant: null,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_OWNED_RESTAURANT:
      localStorage.setItem("currentRestaurant", payload._id);
      return {
        ...state,
        loading: false,
        restaurant: payload,
      };
    case GET_OWNED_RESTAURANTS:
      return {
        ...state,
        loading: false,
        restaurant: null,
        restaurants: payload,
      };
    case DELETE_OWNED_RESTAURANT:
      return {
        ...state,
        loading: false,
        restaurants: state.restaurants.filter(
          (restaurant) => restaurant._id !== payload
        ),
      };
    case OWNED_RESTAURANT_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case UPDATE_OWNED_RESTAURANT:
      return {
        ...state,
        loading: false,
        restaurant: payload,
      };
    case CREATE_OWNED_RESTAURANT: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
}
