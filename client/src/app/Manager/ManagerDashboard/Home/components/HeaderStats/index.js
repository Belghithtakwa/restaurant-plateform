import React, {useEffect, Fragment} from "react";
import {getOrderNumber, getOrderConfirmationNumber} from "../../../../../../actions/dashboard.actions"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../../../../utils/Spinner"
// components

import CardStats from "./CardStats";


const HeaderStats= ({dashboard,getOrderConfirmationNumber, getOrderNumber})=> {
  useEffect(() => {
   getOrderNumber(localStorage.getItem("currentRestaurant"));
   
  }, []);
  useEffect(()=>{
    getOrderConfirmationNumber(localStorage.getItem("currentRestaurant"));
  },[]);
  return dashboard.loading ? <Spinner/>:(
    
<Fragment>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Order Number"
                  statTitle= {dashboard.orderNumber}
                  statArrow="up"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Order confirmation number"
                  statTitle={dashboard.orderConfirmationNumber?.orderConfirmedCount}
                  statArrow="down"
                  statPercent={Math.floor(dashboard.orderConfirmationNumber?.orderConfirmedPercent)}
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-red-500"
                />
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
HeaderStats.propTypes = {
  dashboard: PropTypes.object,
  getOrderConfirmationNumber: PropTypes.func.isRequired,
  getOrderNumber : PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
});

const mapDispatchToProps = {
  getOrderConfirmationNumber,
  getOrderNumber
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderStats);
