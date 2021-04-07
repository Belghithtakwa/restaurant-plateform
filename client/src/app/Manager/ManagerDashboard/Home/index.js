import React, { Fragment } from "react";
import PropTypes from "prop-types";
import HomeCard from "./components/HomeCard";
import IncomeChart from "./components/IncomeChart";

const DashboardHome = (props) => {
  return (
    <Fragment>
      <section className="text-gray-600 p-8">
        <div className="flex justify-between gap-4">
          <HomeCard
            symbolicIcon={"fas fa-euro-sign"}
            sideIcon={"fas fa-chart-bar"}
            data={1583}
            desc={"Total Earning"}
            iconColor={"#2589fa"}
            textColor={"#111827"}
          />
          <HomeCard
            symbolicIcon={"fas fa-user"}
            sideIcon={"fas fa-chart-line"}
            data={15}
            desc={"Daily Client"}
            iconColor={"#fa7025"}
            textColor={"#111827"}
          />
          <HomeCard
            symbolicIcon={"fas fa-user"}
            sideIcon={"fas fa-chart-line"}
            data={15}
            desc={"Daily Client"}
            iconColor={"#fa7025"}
            textColor={"#111827"}
          />
          <HomeCard
            symbolicIcon={"fas fa-user"}
            sideIcon={"fas fa-chart-line"}
            data={15}
            desc={"Daily Client"}
            iconColor={"#fa7025"}
            textColor={"#111827"}
          />
        </div>
      </section>
      <section className="text-gray-600 p-8">
        <IncomeChart/>
      </section>
    </Fragment>
  );
};

DashboardHome.propTypes = {};

export default DashboardHome;
