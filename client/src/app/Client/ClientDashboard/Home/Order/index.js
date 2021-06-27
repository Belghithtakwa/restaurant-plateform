import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getClientOrders } from "../../../../../actions/order.actions";
import Spinner  from "../../../../utils/Spinner"
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
const OrdersClient = ({ getClientOrders, order }) => {
  useEffect(() => {
    getClientOrders();
  }, []);
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
                  Created At
                </th>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-gray-200">
                  state
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
//prop validation
OrdersClient.propTypes = {
  order: PropTypes.object.isRequired,
  getClientOrders: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  order: state.order,
});
const mapDispatchToProps = {
  getClientOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersClient);
