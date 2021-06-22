import { combineReducers } from "redux";
import auth from "./auth.reducers"
import menu from "./menu.reducers"
import restaurant from "./restaurant.reducers";
import order from "./order.reducers";
import product from "./product.reducers";
import category from "./category.reducers";
import message from "./message.reducers"; 
export default combineReducers({
  auth,
  menu,
  restaurant,
  category,
  product,
  order,
  message, 
});
