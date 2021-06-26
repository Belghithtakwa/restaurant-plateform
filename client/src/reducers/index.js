import { combineReducers } from "redux";
import auth from "./auth.reducers";
import menu from "./menu.reducers";
import restaurant from "./restaurant.reducers";
import category from "./category.reducers";
import product from "./product.reducers";
import order from "./order.reducers";
import message from "./message.reducers";
import dashboard from "./dashboard.reducers"
export default combineReducers({
  auth,
  menu,
  restaurant,
  category,
  product,
  order,
  message,
  dashboard
});
