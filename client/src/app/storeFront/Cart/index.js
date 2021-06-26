import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getOwnedOrder } from "../../../actions/order.actions";

const Cart = ({ order, getOwnedOrder }) => {
  const [isOpen, setisOpen] = useState(false);
  useEffect(() => {
    localStorage.getItem("orderId") &&
      getOwnedOrder(localStorage.getItem("orderId"));
  }, [order.loading]);

  const toggleCart = (e) => {
    e.preventDefault();
    getOwnedOrder(localStorage.getItem("orderId"));
    setisOpen(!isOpen);
  };
  return (
    <Fragment>
      <div className="absolute">
        <div className="fixed right-4 bottom-8">
          <div
            onClick={(e) => {
              toggleCart(e);
            }}
            className="shadow-lg rounded-full w-16 h-16 bg-primary hover:bg-primary-tint cursor-pointer flex items-center justify-center">
            <i className="fas fa-shopping-cart text-white text-3xl"></i>
          </div>
        </div>
        {isOpen && (
          <div className="fixed shadow-lg right-8 bottom-28 w-64 h-1/3">
            <div className="flex h-full justify-between flex-col">
              <div className="py-2 px-4 h-5/6">
                <div className="font-bold text-2xl space-y-3">Item in cart</div>
                {order.order &&
                  order.order.items &&
                  order.order.items.map((el, index) => {
                    return (
                      <div className="flex justify-between items-center">
                        <i className="fas fa-tags"></i>
                        <div>{el?.product?.productName}</div>
                        <div>#{el?.quantity}</div>
                        <div>{el?.totalPrice}</div>
                      </div>
                    );
                  })}
              </div>
              {order.order && (
                <div className="w-full h-2/6 flex flex-col gap-2 justify-between">
                  <div className="flex py-2 px-4 justify-between items-center">
                    <div>Total:</div>
                    <div>{order?.order?.totalPrice}</div>
                  </div>
                  <Link
                    to={`/order/${localStorage.getItem("orderId")}/checkout`}
                    className="border bg-primary py-2 px-4 text-xs font-semibold text-gray-700 text-center">
                    Checkout
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

Cart.propTypes = {
  order: PropTypes.object.isRequired,
  getOwnedOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  order: state.order,
});

const mapDispatchToProps = {
  getOwnedOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
