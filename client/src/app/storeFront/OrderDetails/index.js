import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { getOwnedOrderByCode } from "../../../actions/order.actions";
import { connect } from "react-redux";
import Spinner from "../../utils/Spinner";
const OrderDetails = ({ order, getOwnedOrderByCode }) => {
  const { orderCode } = useParams();
  useEffect(() => {
    getOwnedOrderByCode(orderCode);
  }, [order.loading, orderCode]);
  return order.loading ? (
    <Spinner />
  ) : (
    <div className=" w-30 max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
      <h2 className="font-bold">Order Details</h2>
      <section>
        <div className="w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 block hover:bg-gray-100 transition duration-150">
          <i className="fas fa-id-card-alt"></i>
          order Code
          <span className="text-gray-400 text-sm"> {orderCode}</span>
        </div>
        <div className="w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 block hover:bg-gray-100 transition duration-150">
          <i className="far fa-user-circle"></i>
          clientName
          <span className="text-gray-400 text-sm">
            
            {order?.order?.client?.firstName} {order?.order?.client?.lastName}
          </span>
        </div>
        <div className="w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 block hover:bg-gray-100 transition duration-150">
          <i className="fas fa-phone"></i>
          phone
          <span className="text-gray-400 text-sm">
            
            {order?.order?.client?.phoneNumber}
          </span>
        </div>
        <div className="w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 block hover:bg-gray-100 transition duration-150">
          order type
          <span className="text-gray-400 text-sm"> {order?.order?.orderType}</span>
        </div>
        <div className="w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 block hover:bg-gray-100 transition duration-150">
          state
          <span className="text-gray-400 text-sm"> {order?.order?.state}</span>
        </div>
        <div className="w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 block hover:bg-gray-100 transition duration-150">
          <i className="fas fa-map-marker"></i>
          deliveryAddress
          <span className="text-gray-400 text-sm">
            {order?.order?.deliveryAddress?.streetName}
            {order?.order?.deliveryAddress?.codeZip}
            {order?.order?.deliveryAddress?.blockNumber}
          </span>
        </div>
        <div className="w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 block hover:bg-gray-100 transition duration-150">
          <i className="fas fa-money-bill-alt"></i>
          payed
          <span className="text-gray-400 text-sm">
            
            {order?.order?.payed ? "Payed" : "Not Payed"}
          </span>
        </div>
        <div className="w-full border-t-2 border-gray-100 font-medium text-gray-600 py-4 px-4 block hover:bg-gray-100 transition duration-150">
          <i className="fas fa-money-check"></i>
          total price
          <span className="text-gray-400 text-sm"> {order?.order?.totalPrice}</span>
        </div>
      </section>
    </div>
  );
};

OrderDetails.propTypes = {
  order: PropTypes.object,
  getOwnedOrderByCode: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  order: state.order,
});

const mapDispatchToProps = {
  getOwnedOrderByCode,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
