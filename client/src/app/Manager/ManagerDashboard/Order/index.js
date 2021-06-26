import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getManagerOrders } from "../../../../actions/order.actions";
import Spinner from "../../../utils/Spinner";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
const DashboardOrders = ({ getManagerOrders, order, restaurant }) => {
  useEffect(() => {
    getManagerOrders(localStorage.getItem("currentRestaurant"));
  }, [getManagerOrders, order.loading]);
  return order.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className="p-8 text-gray-800">
        <div className="border rounded-md shadow mt-10">
          <table className="text-left w-full ">
            <thead>
              <tr>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-gray-200">
                  Number
                </th>

                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-gray-200">
                  Description
                </th>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-gray-200">
                  Created At
                </th>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-gray-200">
                  state
                </th>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {order.orders &&
                order.orders.map((order, index) => {
                  return (
                    <tr className="hover:bg-grey-lighter">
                      <td className="py-4 px-6 border-b border-gray-200">
                        #{index}
                      </td>
                      <td className="py-4 px-6 border-b border-gray-200">
                        {order.orderType}
                      </td>
                      <td className="py-4 px-6 border-b border-gray-200">
                        {format(parseISO(order.createdAt), "PPpp")}
                      </td>
                      <td className="py-4 px-6 border-b border-gray-200">
                        {order.state}
                      </td>
                      <td className="py-4 px-6 border-b border-gray-200">
                        <Link
                          to={`/manager/dashboard/orders/${order._id}`}
                          className="w-10 h-10 focus:outline-none appearance-none font-bold py-1 px-3 rounded text-xs bg-blue hover:bg-primary hover:text-white">
                          <i className="fas fa-tv"></i>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </Fragment>
  );
};
DashboardOrders.propTypes = {
  order: PropTypes.object.isRequired,
  restaurant: PropTypes.object,
  getManagerOrders: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  order: state.order,
  restaurant: state.restaurant,
});
const mapDispatchToProps = {
  getManagerOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardOrders);
