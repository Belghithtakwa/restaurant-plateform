import React, { Fragment } from "react";
import HeaderStats from "./components/HeaderStats";




const DashboardHome = (props) => {
  return (
    <Fragment>
      <section className="text-gray-600 p-8">
        <HeaderStats />
      </section>
    </Fragment>
  );
};

DashboardHome.propTypes = {};

export default DashboardHome;
