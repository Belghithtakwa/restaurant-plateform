import {
  GET_ADDRESS,
  GET_ADDRESSES,
  CREATE_ADDRESS,
  DELETE_ADDRESS,
  UPDATE_ADDRESS,
  ADDRESS_ERROR,
} from "../actions/types";
const initialState = {
  loading: true,
  addresses: [],
  address: null,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ADDRESS:
      return {
        ...state,
        loading: false,
        address: payload,
      };
    case GET_ADDRESSES:
      return {
        ...state,
        loading: false,
        address: null,
        addresses: payload,
      };
    case DELETE_ADDRESS:
      return {
        ...state,
        loading: false,
        addresses: state.addresses.filter((address) => address._id !== payload),
      };
    case ADDRESS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case UPDATE_ADDRESS:
      return {
        ...state,
        loading: false,
        address: payload,
      };
    case CREATE_ADDRESS: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
}
