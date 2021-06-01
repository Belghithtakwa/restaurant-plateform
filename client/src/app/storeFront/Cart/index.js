import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

const Cart = ({}) => {
  const [ToggleCart, setToggleCart] = useState(false);
  return (
    <Fragment>
      <div className="absolute">
        <div className="fixed right-4 bottom-8">
          <div
            onClick={(e) => {
              setToggleCart(!ToggleCart);
            }}
            className="shadow-lg rounded-full w-16 h-16 bg-primary hover:bg-primary-tint cursor-pointer flex items-center justify-center">
            <i class="fas fa-shopping-cart text-white text-3xl"></i>
          </div>
        </div>
        {ToggleCart && (
          <div className="fixed right-8 bottom-28 w-64">
            <div className="shadow-lg rounded-md min-w-min"> items</div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

Cart.propTypes = {};

export default Cart;
