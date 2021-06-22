import React, { Fragment, useState, useEffect } from "react";
import Spinner from "../../utils/Spinner";
import { connect } from "react-redux";
import {
  getOwnedOrder,
  checkoutClientOrder,
} from "../../../actions/order.actions";
import { useHistory, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import CheckoutModal from "./CheckoutModal";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe(
  "pk_test_51H4HhsIK4kdInodw5vGNJktjTNLRcqRvgG8wAyHGD0bbg9EUmGBixju9rAChukBuXG51MZjJzxnyWrrSaORki2jq008eqzzhrY"
);

const Checkout = ({ order, getOwnedOrder, checkoutClientOrder }) => {
  let history = useHistory();
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState({
    streetName: "",
    codeZip: "",
    blockNumber: "",
    orderType: "in_place",
  });

  const onInputChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };
  const onCheckBoxChange = (e) => {
    setOrderData({
      ...orderData,
      orderType: e.target.checked ? "delivery" : "in_place",
    });
  };
  const onCheckoutSubmit = async (e) => {
    e.preventDefault();
    const stripe = await stripePromise;
    if (orderData.orderType === "delivery") {
      const res = await axios.get(
        `http://localhost:8000/api/orders/${localStorage.getItem(
          "orderId"
        )}/client/pay?delivery=true`
      );
      stripe.redirectToCheckout({
        sessionId: res.data.session,
      });
    } else {
      const res = await axios.get(
        `http://localhost:8000/api/orders/${localStorage.getItem(
          "orderId"
        )}/client/pay?delivery=false`
      );
      stripe.redirectToCheckout({
        sessionId: res.data.session,
      });
    }
  };
  useEffect(() => {
    getOwnedOrder(orderId);
  }, [order.loading]);
  if (order.order.state === "confirmed") {
    history.push(`/orders/details/${order.order.code}`);
  }
  return order.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {order?.order?.state === "waiting_confirmation" && (
        <CheckoutModal orderCode={order.order.code} />
      )}
      <div className="flex justify-between w-full gap-1 px-6">
        <div className="w-1/2 p-6 my-10 flex flex-col justify-between border border-gray-300">
          <div className="w-full">
            <div className="text-3xl text-primary-shade mb-8">Cart Items</div>
            <div className="flex flex-col justify-around gap-4">
              {order.order &&
                order.order.items &&
                order.order.items.map((el, index) => {
                  return (
                    <div className="flex justify-between items-center">
                      <i className="fas fa-tags"></i>
                      <div>{el.product.productName}</div>
                      <div>#{el.quantity}</div>
                      <div>{el.totalPrice}</div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>Total:</div>
            <div>{order?.order?.totalPrice}</div>
          </div>
        </div>
        <form
          onSubmit={(e) => onCheckoutSubmit(e)}
          className="form bg-white p-6 my-10 w-1/2 border border-gray-300">
          <p className="text-gray-600"> Fill your order data</p>
          <div className="space-y-5">
            <div className="w-full space-x-3 flex items-center justify-start">
              <input
                type="checkbox"
                id="orderType"
                name="orderType"
                className="bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-tint text-base outline-none text-gray-800 transition-colors duration-200 ease-in-out"
                onChange={(e) => onCheckBoxChange(e)}
              />
              <label
                htmlFor="orderType"
                className="leading-7 text-sm text-gray-600">
                Delivery ?
              </label>
            </div>
            {orderData.orderType === "delivery" && (
              <Fragment>
                <div className="w-full">
                  <label
                    htmlFor="streetName"
                    className="leading-7 text-sm text-gray-600">
                    Street Name
                  </label>
                  <input
                    type="text"
                    id="streetName"
                    name="streetName"
                    className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-tint text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    required
                    value={orderData.setOrderData}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="blockNumber"
                    className="leading-7 text-sm text-gray-600">
                    Block Number
                  </label>
                  <input
                    type="text"
                    id="blockNumber"
                    name="blockNumber"
                    className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-tint text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) => onInputChange(e)}
                    value={orderData.blockNumber}
                    required
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="codeZip"
                    className="leading-7 text-sm text-gray-600">
                    Zip Code
                  </label>
                  <input
                    type="number"
                    id="codeZip"
                    name="codeZip"
                    className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-tint text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    required
                    value={orderData.codeZip}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </Fragment>
            )}
          </div>

          <button
            type="submit"
            value="Submit"
            className="w-full mt-6 focus:outline-none appearance-none bg-primary hover:bg-primary-tint text-white font-semibold p-3">
            Checkout
          </button>
        </form>
      </div>
    </Fragment>
  );
};
Checkout.propTypes = {
  order: PropTypes.object.isRequired,
  getOwnedOrder: PropTypes.func.isRequired,
  checkoutClientOrder: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  order: state.order,
});

const mapDispatchToProps = {
  getOwnedOrder,
  checkoutClientOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
