import {
  ORDER_CONFIRMATION_NUMBER,
  ORDER_NUMBER,
  DASHBOARD_ERROR,
 
} from "../actions/types";

const initialState= {
  loading: true,
  orderNumber: null,
  orderConfirmationNumber : null,
  error : {}
}
export default function (state = initialState, action){
  const {type, payload} = action;
  switch(type){
    case ORDER_CONFIRMATION_NUMBER:
      return {
        ... state,
        loading : false,
        orderConfirmationNumber: payload,
       
      };
      case ORDER_NUMBER:
        return  {
          ...state,
          loading:false,
           orderNumber: payload
        };
        case DASHBOARD_ERROR:
          return {
            ...state,
            loading:false,
            error : payload
          }
          default : return state;
  }
}