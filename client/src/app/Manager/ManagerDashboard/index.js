import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Sidebar from "./Sidebar/index";
import DashboardHome from "./Home";
import DashboardMenu from "./Menu";
import DashboardCategories from "./Categories";
import DashboardProducts from "./Products";
import DashboardOrders from "./Order";
import OrderId from "./Order/OrderId";
import { Switch, Route } from "react-router-dom";
import ManagerTopbar from "./Topbar";
import AddMenu from "./Menu/addMenu";
import AddCategory from "./Categories/addCategory";
import AddProduct from "./Products/addProduct";
import EditCategory from "./Categories/editCategory";
import EditProduct from "./Products/editProduct";

const ManagerDashboard = (props) => {
  return (
    <Fragment>
      <ManagerTopbar />
      <div className="flex">
        <Sidebar></Sidebar>
        <Switch>
          <div className="h-screen w-full overflow-y-auto">
            <Route
              exact
              path="/manager/dashboard/home"
              component={DashboardHome}
            ></Route>
            <Route
              exact
              path="/manager/dashboard/menus"
              component={DashboardMenu}
            ></Route>
            <Route
              exact
              path="/manager/dashboard/menus/create"
              component={AddMenu}
            ></Route>
            <Route
              exact
              path="/manager/dashboard/categories"
              component={DashboardCategories}
            ></Route>
            <Route
              exact
              path="/manager/dashboard/categories/create"
              component={AddCategory}
            ></Route>
            <Route
              exact
              path="/manager/dashboard/categories/:categoryId/edit"
              component={EditCategory}
            ></Route>
            <Route
              exact
              path="/manager/dashboard/products"
              component={DashboardProducts}
            ></Route>
            <Route
              exact
              path="/manager/dashboard/products/create"
              component={AddProduct}
            ></Route>
            <Route
              exact
              path="/manager/dashboard/products/:productId/edit"
              component={EditProduct}
            ></Route>
            <Route
              exact
              path="/manager/dashboard/orders"
              component={DashboardOrders}
              
            ></Route>
            <Route
              exact
              path="/manager/dashboard/orders/:orderId"
              component={OrderId}
            ></Route>
          </div>
        </Switch>
      </div>
    </Fragment>
  );
};

ManagerDashboard.propTypes = {};

export default ManagerDashboard;
