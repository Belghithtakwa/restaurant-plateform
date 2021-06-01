import React, { Fragment, useState, useEffect } from "react";
import ProtpTypes from "prop-types";
import { connect } from "react-redux";
import { getOwnedOrder } from "../../../../../actions/order.actions";
import { useHistory, useParams } from "react-router-dom";
const OrderId = ({ order }) => {
  let history = useHistory();
  let { orderId } = useParams();
  const [OrderData, setOrderData] = useState({
    items: "",
    client: "",
    orderType: "",
    state: "",
    deliveryAddress: "",
    payed: "",
    price: 0,
  });
  useEffect(() => {
    getOwnedOrder(orderId, localStorage.getItem("currentRestaurant"));
  }, [orderId, order.loading]);
  return <Fragment>{orderId}</Fragment>;
};
const mapStateToProps = (state) => ({
  order: state.order,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderId);
