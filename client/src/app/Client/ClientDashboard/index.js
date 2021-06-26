import React, { Fragment } from "react";

import Sidebar from "./Sidebar";
import { Switch, Route } from "react-router-dom";
import ClientTopbar from "./Topbar";
import DashboardHome from "./Home";
const ClientDashboard = () => {
  return (
    <Fragment>
      <ClientTopbar />
      <div className="flex">
        <Sidebar></Sidebar>
        <Switch>
          <div className="h-screen w-full overflow-y-auto">
            <Route
              exact
              path="/client/dashboard/home"
              component={DashboardHome}></Route>
              {/* <Route exact path="/client/dashboard/orders" component={OrdersClient}/> */}
          </div>
        </Switch>
      </div>
    </Fragment>
  );
}

export default ClientDashboard;
