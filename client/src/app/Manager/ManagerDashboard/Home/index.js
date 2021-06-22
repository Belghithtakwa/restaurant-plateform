import React, { Fragment } from "react";
import PropTypes from "prop-types";
import HomeCard from "./components/HomeCard";
import IncomeChart from "./components/IncomeChart";
import Chart from "./components/Chart"
import HeaderStats from "./components/HeaderStats";
import NavBarManager from "./components/NavBarManager";
import Table from "./components/Table";



const DashboardHome = (props) => {
  return (
    <Fragment>
      <section className="text-gray-600 p-8">
        <HeaderStats />
        <Table/>
      </section>
      <section></section>
      <section className="text-gray-600 p-8 flex justify-between items-center">
        <IncomeChart />
        <Chart/>
      </section>
    </Fragment>
  );
};

DashboardHome.propTypes = {};

export default DashboardHome;
