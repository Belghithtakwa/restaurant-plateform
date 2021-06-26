import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const CheckoutModal = ({ orderCode }) => {
  let history = useHistory();
  const backToMenu = (e) => {
    e.preventDefault();
    history.goBack();
  };
  const goToOrderDetails = (e) => {
    e.preventDefault();
    history.push(`/orders/details/${orderCode}`);
  };
  return (
    <div className="absolute h-full w-full z-10 bg-gray-500 bg-opacity-50">
      <div
        className="w-1/2 bg-white rounded-lg text-center absolute left-1/4 top-1/4 p-8"
        style={{ Height: "fit-content" }}>
        <i className="fas fa-check-square text-7xl text-primary"></i>
        <h1 className="text-3xl font-bold mt-12">
          Your order is added successfully and waiting for confirmation
        </h1>
        <div className="flex justify-evenly w-full items-center mt-24">
          {/* <button
            onClick={(e) => backToMenu(e)}
            className="text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary-shade rounded text-lg">
            Back to Menu
          </button> */}
          <button
            onClick={(e) => goToOrderDetails(e)}
            className="text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary-shade rounded text-lg">
            Order Details
          </button>
        </div>
      </div>
    </div>
  );
};
CheckoutModal.propTypes = {
  orderCode: PropTypes.string.isRequired,
};
export default CheckoutModal;
